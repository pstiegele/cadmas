const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT PayloadData.id, PayloadData.activityID, PayloadData.payloadDeviceID, PayloadData.type, PayloadData.filepath, PayloadData.size FROM PayloadData LEFT JOIN Activity ON PayloadData.activityID=Activity.id LEFT JOIN Mission ON Activity.missionID=Mission.id WHERE Mission.userID=?";
    db.query(query, ws.userID, function (error, results) {
        if (error||results===undefined){
            winston.error('error in payloads: ' + error);
            return;
        }
        var res = [];
        winston.info('build payloads');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'payloadID': element.id,
                'activityID': element.activityID,
                'payloadDeviceID': element.payloadDeviceID,
                'type': element.type,
                'filepath': element.filepath,
                'size': element.size
            }
            );
        }
        send(ws, "payloads", res);
    });







}