const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT id, activityID, payloadDeviceID, type, filepath, size FROM PayloadData";
    db.query(query, ws.userID, function (error, results) {
        if (error||results===undefined) winston.error('error in payloads: ' + error);
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