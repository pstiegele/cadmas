const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws, missionID, fullMission) {
    var db = global.db;
    var query = "SELECT id, name, note, UNIX_TIMESTAMP(dtCreated) AS dt_created, thumbnailpath, onConnectionLostMode, route FROM Mission WHERE id = ?";
    db.query(query, missionID, function (error, results) {
        if (error || results.length != 1) winston.error('error in mission: ' + error);
        winston.info('build mission');
        var res = {
            'missionID': results[0].id,
            'name': results[0].name,
            'note': results[0].note,
            'dt_created': results[0].dt_created,
            'thumbnailpath': results[0].thumbnailpath,
            'onConnectionLostMode': results[0].onConnectionLostMode,
            'route': results[0].route
        };
        if (fullMission) {
            res.waypoints = [];
            var waypointquery = "SELECT missionIndex, altitude, location, type FROM MissionWaypoints WHERE missionID = ? ORDER BY missionIndex";
            db.query(waypointquery, missionID, function (error, results) {
                if (error) winston.error('error in mission (get waypoints): ' + error);
                winston.info('build waypoints to mission');
                results.forEach(element => {
                    element.lat = element.location.x;
                    element.lng = element.location.y;
                    delete element.location;
                    res.waypoints.push(element);
                });
                send(ws, "mission", res);
            });
        } else {
            send(ws, "mission", res);
        }

    });







}