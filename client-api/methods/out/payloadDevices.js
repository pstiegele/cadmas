const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
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
        send(ws, "payloadDevices", res);
    });







}