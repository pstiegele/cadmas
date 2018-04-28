const ack = require('../out/ack');
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
    var db = global.db;
    var query = "INSERT INTO AttitudeTelemetry (activityID,timestamp,pitch,roll,heading) VALUES (?,?,?,?,?);";
    db.query(query, [3, payload.timestamp, payload.pitch, payload.roll, payload.heading], function (error) {
        if (error) winston.error('error in attitude: ' + error);;
        winston.info('attitude successfully inserted');
        ack('attitudeACK', 0, ws, callback);
    });

}
