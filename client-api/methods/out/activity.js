const winston = require('../../../middleware/logger');
module.exports = function (ws, activityID, callback) {
    var db = global.db;
    var query = "SELECT id,missionID, droneID, name, state, note, UNIX_TIMESTAMP(dt_created) AS dt_created, UNIX_TIMESTAMP(dt_ended) AS dt_ended, thumbnailpath, TIMESTAMPDIFF(MINUTE, dt_created, dt_ended) AS duration FROM Activity WHERE id = ?";
    db.query(query, activityID, function (error, results) {
        if (error || results.length != 1) winston.error('error in activity: ' + error);
        winston.info('build activity');
        var res = {
            'activityID': results[0].id,
            'missionID': results[0].missionID,
            'droneID': results[0].droneID,
            'name': results[0].name,
            'state': results[0].state,
            'note': results[0].note,
            'dt_created': results[0].dt_created,
            'dt_ended': results[0].dt_ended,
            'duration': results[0].duration,
            'thumbnailpath': results[0].thumbnailpath
        };
        callback(ws, "activity", res);
    });







}