const winston = require('../../../middleware/logger');
module.exports = function (ws, callback) {
    var db = global.db;
    var query = "SELECT id, activityID, payloadDeviceID, type, filepath, size FROM PayloadData";
    db.query(query, ws.userID, function (error, results) {
        if (error) winston.error('error in payloads: ' + error);
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
        callback(ws, "payloads", res);
    });







}