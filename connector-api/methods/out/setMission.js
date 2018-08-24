var moment = require('moment');
const winston = require('../../../middleware/logger');
var send = require('../../main').send;

module.exports = function (ws, missionID, callback) {
    var query = "SELECT type, location, altitude FROM MissionWaypoints WHERE missionID=? ORDER BY missionIndex";
    db.query(query, missionID, function (error, result) {
        if (error) winston.error('error in setMission(connector): ' + error);
        var payload = {
            restart: true,
            waypoints: []
        };
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            if (element.type !== "HOMEPOINT") {
                const waypoint = {
                    type: element.type,
                    latitude: element.location.x,
                    longitude: element.location.y,
                    altitude: element.altitude,

                }
                payload.waypoints.push(waypoint);
            }
        }
        send(ws, "setMission", payload);
        callback();
    });

}