const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const mission = require('../out/mission');
const request = require('request');

module.exports = function (ws, msg, callback) {
    var db = global.db;
    payload = msg.payload;
    var query = "INSERT INTO Mission (name,note,userID) VALUES (?,?,?,?);";
    db.query(query, [payload.name, payload.note, ws.userID], function (error, result) {
        if (error) winston.error('error in addMission: ' + error);
        winston.info('mission successfully inserted');
        //parse route
        if (payload.route.startsWith('QGC')) {
            parseMissionPlannerFile(payload.route, result.insertId);
        } else {
            // parseKMLFile(payload.route, result.insertId);
        }

        var ackPayload = {
            ackToID: msg.id,
            missionID: result.insertId
        };
        ack('addMissionACK', ackPayload, ws, callback);


        //send new mission to every client
        if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
            global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
                winston.info("new mission sent to client");
                mission(value1, result.insertId, false);
            });
        }
    });

}

function calcDistance(lat1, lat2, lng1, lng2) {
    var R = 6371e3; // earth radius in m
    var lat1inRadian = lat1*Math.PI/180.0;
    var lat2inRadian = lat2*Math.PI/180.0;
    var deltaLat = (lat2 - lat1)*Math.PI/180.0;
    var deltaLng = (lng2 - lng1)*Math.PI/180.0;

    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1inRadian) * Math.cos(lat2inRadian) *
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function parseMissionPlannerFile(file, missionID) {
    var lines = file.split('\n');
    var distance = 0;
    var lastWaypoint = { lat: 0, lng: 0, alt: 0 };
    var route = "LineString(";
    var startlat = 0;
    var startlng = 0;
    var location = "";
    for (let i = 1; i < lines.length; i++) {
        const element = lines[i].split('\t');
        if (element.length !== 12) {
            continue;
        }
        const altitude = element[10];
        const latitude = element[8];
        const longitude = element[9];
        var type = element[3];
        const missionIndex = element[0];
        if (i === 2) {
            lastWaypoint = { lat: latitude, lng: longitude, alt: altitude };
            startlat = latitude;
            startlng = longitude;
        }
        if (element[0] === "0" && element[1] === "1") {
            type = "HOMEPOINT";
        } else if (type === "21") {
            distance += calcDistance(lastWaypoint.lat,latitude,lastWaypoint.lng,longitude);
            lastWaypoint = { lat: latitude, lng: longitude, alt: altitude };
            route = route.concat(latitude + " " + longitude + ",");
            type = "LAND";
        } else if (type === "22") {
            type = "TAKEOFF";
        } else if (type === "20") {
            route = route.concat(latitude + " " + longitude + ",");
            distance += calcDistance(lastWaypoint.lat,latitude,lastWaypoint.lng,longitude);
            lastWaypoint = { lat: latitude, lng: longitude, alt: altitude };
            type = "RTL";
        } else if (type === "16") {
            route = route.concat(latitude + " " + longitude + ",");
            distance += calcDistance(lastWaypoint.lat,latitude,lastWaypoint.lng,longitude);
            lastWaypoint = { lat: latitude, lng: longitude, alt: altitude };
            type = "WAYPOINT";
        } else if (type = "19") {
            type = "LOITER";
        } else {
            type = "INVALID";
        }

        //winston.error("lat: "+latitude+"     long: "+longitude);
        var waypointQuery = "INSERT INTO MissionWaypoints (missionID,altitude,location, type,missionIndex) VALUES (?,?,POINT(?,?),?,?);";
        //winston.info("altitude: "+altitude+". location: "+location);
        db.query(waypointQuery, [missionID, altitude, latitude, longitude, type, missionIndex], function (errorWaypoint, resultWaypoint) {
            if (errorWaypoint) winston.error('error in addMission (in MissionPlanner waypoints): ' + errorWaypoint);
        });
        winston.info("dist: " + distance);
    }

    request('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + startlat + ',' + startlng + '&key=AIzaSyDLXJWBg4erodb8JOpJs8UozSPY8pGU6Pk', { json: true }, (err, res, body) => {
        if (err) {
            return winston.err("error in fetching google api in addMission: " + err);
        } else {
            if (body.results !== null && body.results !== undefined && body.results.length >= 1 && body.results[1] !== null & body.results[1] !== undefined && body.results[1].formatted_address !== undefined) {
                // for (let i = 0; i < body.results[0].address_components.length; i++) {
                //     const element = body.results[0].address_components[i];
                //     if (element.types.filter(type => "sublocality").length >= 1) {
                //         location = JSON.stringify(body.results[0].address_components[i].long_name);
                //     }
                //     if (element.types.filter(type => "locality").length >= 1) {
                //         location = location.concat(", "+JSON.stringify(body.results[0].address_components[i].long_name));
                //     }
                // }
                location = body.results[1].formatted_address;

            }

        }
        var query = "UPDATE Mission SET distance=?,route=ST_GeomFromText(?),location=? WHERE id=?";
        db.query(query, [distance, route.substring(0, route.length - 1) + ")", location, missionID], function (error) {
            if (error) winston.error('error in addMission (in MissionPlanner (add distance)): ' + error);
        });
    });

}

function parseKMLFile(file, missionID) {
    var parseString = require('xml2js').parseString;
    parseString(file, function (err, parseResult) {
        winston.error("xml: " + JSON.stringify(parseResult.kml.Document[0].Placemark[0].LineString[0].coordinates));
        const regex = /[0-9]+[0-9,.]*/gm;
        var coordinates = parseResult.kml.Document[0].Placemark[0].LineString[0].coordinates[0].match(regex);
        for (let i = 0; i < coordinates.length; i++) {
            const element = coordinates[i];
            const regexElement = /[0-9.]+/gm;
            const altitude = element.match(regexElement)[2];
            const longitude = element.match(regexElement)[0];
            const latitude = element.match(regexElement)[1];
            if (i === 0) {
                type = "HOMEPOINT";
            } else if (i === 1) {
                type = "TAKEOFF";
            } else if (i === coordinates.length - 1) {
                type = "LAND";
            } else {
                type = "WAYPOINT";
            }
            const type = "WAYPOINT";
            const missionIndex = i;
            var waypointQuery = "INSERT INTO MissionWaypoints (missionID,altitude,location, type,missionIndex) VALUES (?,?,POINT(?,?),?,?);";
            //winston.info("altitude: "+altitude+". location: "+location);
            db.query(waypointQuery, [missionID, altitude, latitude, longitude, type, missionIndex], function (errorWaypoint, resultWaypoint) {
                if (errorWaypoint) winston.error('error in addMission (in KML waypoints): ' + errorWaypoint);
            });
        }
    });
}

