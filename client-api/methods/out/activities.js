const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT Activity.id,Activity.missionID, Activity.droneID, Activity.name, Activity.state, Activity.note, UNIX_TIMESTAMP(Activity.dt_created) AS dt_created, UNIX_TIMESTAMP(Activity.dt_ended) AS dt_ended, Activity.thumbnailpath, TIMESTAMPDIFF(MINUTE, Activity.dt_created, Activity.dt_ended) AS duration FROM Activity LEFT JOIN Drone ON Activity.droneID = Drone.id WHERE Drone.userID = ?";
    db.query(query, ws.userID, function (error, results) {
        if (error||results===undefined) winston.error('error in activities: ' + error);
        var res = [];
        winston.info('build activities');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'activityID': element.id,
                'missionID': element.missionID,
                'droneID': element.droneID,
                'name': element.name,
                'state': element.state,
                'note': element.note,
                'dt_created': element.dt_created,
                'dt_ended': element.dt_ended,
                'duration': element.duration,
                'thumbnailpath': element.thumbnailpath
            }
            );
        }
        send(ws, "activities", res);
    });







}