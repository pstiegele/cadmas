const winston = require('../../../middleware/logger');
module.exports = function (ws, callback) {
    var db = global.db;
    var query = "SELECT * FROM Problem";
    db.query(query, function (error, results) {
        if (error) winston.error('error in notifications: ' + error);
        var res = [];
        winston.info('build notifications');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'notificationID': element.id,
                'activityID': element.activityID,
                'dt_occured': element.dt_occured,
                'type': element.type,
                'title': element.title,
                'description': element.description
            }
            );
        }
        callback(ws, "notifications", {'payload': res});
    });







}