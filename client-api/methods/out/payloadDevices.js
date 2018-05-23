const winston = require('../../../middleware/logger');
module.exports = function (ws, callback) {
    var db = global.db;
    var query = "SELECT id, name, typeName FROM PayloadDevice WHERE userID=?";
    db.query(query, ws.userID, function (error, results) {
        if (error) winston.error('error in payloadDevices: ' + error);
        var res = [];
        winston.info('build payloadDevices');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'payloadDeviceID': element.id,
                'name': element.name,
                'typeName': element.typeName
            }
            );
        }
        callback(ws, "payloadDevices", res);
    });







}