const ack = require('../out/ack');
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
    var db = global.db;
    var position = "POINT("+payload.latitude+","+payload.longitude+")";
    var query = "INSERT INTO PositionTelemetry (activityID,timestamp,position, altitude) VALUES (?,?,?,?);";
    db.query(query, [3, payload.timestamp, position,payload.altitude], function (error) {
        if (error) winston.error('error in position: ' + error);;
        winston.info('position successfully inserted');
        ack('positionACK', 0, ws, callback);
    });

}