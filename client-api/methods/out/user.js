const winston = require('../../../middleware/logger');
const send = require("../../main").send;
const moment = require("moment");

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT id,username,registrationdate,email,thumbnailpath,firstname,lastname FROM User WHERE id=?";
    db.query(query, ws.userID, function (error, results) {
        if (error ||results===undefined|| results.length !== 1) {
            winston.error('error in user: ' + error);
            return;
        }
        var query2 = "SELECT COUNT(*) AS count FROM CameraImage LEFT JOIN Activity ON CameraImage.activityID = Activity.id LEFT JOIN Mission ON Activity.missionID = Mission.id WHERE Mission.userID=? AND timestamp > ?";
        db.query(query2, [ws.userID, moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss')], function (error2, results2) {
            if (error2 !== null || results2===undefined||results2.length !== 1) {
                winston.error("error in build user (query2): " + error2);
                return;
            }
            var res;
            winston.info('build user');
            const element = results[0];
            res = {
                'userID': element.id,
                'username': element.username,
                'registrationdate': element.registrationdate,
                'email': element.email,
                'thumbnailpath': element.thumbnailpath,
                "firstname": element.firstname,
                "lastname": element.lastname,
                "cameraImagesLast30Days": results2[0].count
            };
            send(ws, "user", res);
        });
    });







}