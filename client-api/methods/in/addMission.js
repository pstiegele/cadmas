const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const mission = require('../out/mission');

module.exports = function (ws, msg, callback) {
    var db = global.db;
    payload = msg.payload;
    var query = "INSERT INTO Mission (name,note,onConnectionLostMode, userID) VALUES (?,?,?,?);";
    db.query(query, [payload.name, payload.note, payload.onConnectionLostMode, ws.userID], function (error, result) {
        if (error) winston.error('error in addMission: ' + error);
        winston.info('mission successfully inserted');
        //parse route
        if (payload.route.startsWith('QGC')) {
            parseMissionPlannerFile(payload.route, result.insertId);
        } else {
            parseKMLFile(payload.route, result.insertId);
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

function parseMissionPlannerFile(file, missionID){
    var lines = file.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const element = lines[i].split('\t');
        if(element.length!==12){
            return;
        }
        const altitude = element[10];
        const latitude = element[8];
        const longitude = element[9];
        const type = element[3];
        const missionIndex = element[0];
        //winston.error("lat: "+latitude+"     long: "+longitude);
        var waypointQuery = "INSERT INTO MissionWaypoints (missionID,altitude,location, type,missionIndex) VALUES (?,?,POINT(?,?),?,?);";
            //winston.info("altitude: "+altitude+". location: "+location);
            db.query(waypointQuery, [missionID, altitude, latitude, longitude, type, missionIndex], function (errorWaypoint, resultWaypoint) {
                if (errorWaypoint) winston.error('error in addMission (in MissionPlanner waypoints): ' + errorWaypoint);
            });
        
    }
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

