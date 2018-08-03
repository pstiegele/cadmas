const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT Notification.id,Notification.activityID,UNIX_TIMESTAMP(Notification.dt_occured) AS dt_occured, Notification.type, Notification.title, Notification.description,Mission.userID FROM Notification LEFT JOIN Activity ON Notification.activityID=Activity.id LEFT JOIN Mission ON Activity.missionID=Mission.id WHERE Mission.userID=?";
    db.query(query, ws.userID,function (error, results) {
        if (error || results === undefined) {
            winston.error('error in notifications: ' + error);
            return;
        }
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
                });
}
send(ws, "notifications", res);
    });







}