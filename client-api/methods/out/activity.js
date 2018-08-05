const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws, activityID, fullActivity) {
    var db = global.db;
    var query = "SELECT Activity.id,Activity.missionID, Activity.droneID, Activity.name, Activity.state, Activity.note, UNIX_TIMESTAMP(Activity.dt_created) AS dt_created, UNIX_TIMESTAMP(Activity.dt_started) AS dt_started, UNIX_TIMESTAMP(Activity.dt_ended) AS dt_ended, Activity.thumbnailpath, TIMESTAMPDIFF(MINUTE, Activity.dt_created, Activity.dt_ended) AS duration, Mission.userID FROM Activity  JOIN Mission ON Activity.missionID=Mission.id WHERE Activity.id = ?";
    db.query(query, activityID, function (error, results) {
        if (error || results === undefined || results.length != 1 || ws.userID !== results[0].userID) {
            winston.error('error in activity: ' + error);
            return;
        }
        winston.info('build activity');
        var res = {
            'activityID': results[0].id,
            'missionID': results[0].missionID,
            'droneID': results[0].droneID,
            'name': results[0].name,
            'state': results[0].state,
            'note': results[0].note,
            'dt_created': results[0].dt_created,
            'dt_started': results[0].dt_started,
            'dt_ended': results[0].dt_ended,
            'duration': results[0].duration,
            'thumbnailpath': results[0].thumbnailpath
        };
        if (fullActivity) {
            var query2 = "SELECT * FROM PositionTelemetry WHERE activityID=? ORDER BY timestamp";
            db.query(query2, activityID, function (error2, results2) {
                if (error2 || results2 === undefined) {
                    winston.error('error in activity (fullActivity): ' + error2);
                    return;
                }
                res.historyTelemetryPositions=[];
                for (let i = 0; i < results2.length; i++) {
                    const element = results2[i];
                    res.historyTelemetryPositions.push({
                        lat:element.position.x,
                        lng:element.position.y
                    });
                }
                send(ws, "activity", res);
            });
        } else {
            send(ws, "activity", res);
        }
    });







}