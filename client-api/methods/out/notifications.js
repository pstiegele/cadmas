const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT id,activityID,UNIX_TIMESTAMP(dt_occured) AS dt_occured, type, title, description FROM Notification";
    db.query(query, function (error, results) {
        if (error||results===undefined) winston.error('error in notifications: ' + error);
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
        send(ws, "notifications", res);
    });







}