const ack = require('../out/ack');
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
    var db = global.db;
    var query = "INSERT INTO VelocityTelemetry (activityID,timestamp,groundspeed,airspeed,climbrate,altitude) VALUES (?,?,?,?,?,?);";
    db.query(query, [3, payload.timestamp, payload.groundspeed, payload.airspeed, payload.climbrate,payload.altitude], function (error) {
        if (error) winston.error('error in velocity: ' + error);
        winston.info('velocity successfully inserted');
        ack('velocityACK', 0, ws, callback);
    });

}