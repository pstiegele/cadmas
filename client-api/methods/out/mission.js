const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws, missionID, fullMission) {
    var db = global.db;
    var query = "SELECT id, name, note, UNIX_TIMESTAMP(dtCreated) AS dt_created, thumbnailpath, route, userID, distance,location FROM Mission WHERE id = ?";
    db.query(query, missionID, function (error, results) {
        if (error || results === undefined || results.length != 1||results[0].userID!==ws.userID){
            winston.error('error in mission: ' + error);
            return;
        }
        winston.info('build mission');
        var res = {
            'missionID': results[0].id,
            'name': results[0].name,
            'note': results[0].note,
            'dt_created': results[0].dt_created,
            'thumbnailpath': results[0].thumbnailpath,
            'route': results[0].route,
            'distance': results[0].distance,
            'location':results[0].location
        };
        if (fullMission) {
            res.waypoints = [];
            var waypointquery = "SELECT missionIndex, altitude, location, type FROM MissionWaypoints WHERE missionID = ? ORDER BY missionIndex";
            db.query(waypointquery, missionID, function (error, results) {
                if (error || results === undefined) winston.error('error in mission (get waypoints): ' + error);
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