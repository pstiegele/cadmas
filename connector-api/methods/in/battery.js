const ack = require('../out/ack');
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
    var db = global.db;
    var query = "INSERT INTO BatteryTelemetry (activityID,timestamp,voltage,current,percentage) VALUES (?,?,?,?,?);";
    db.query(query, [3, payload.timestamp, payload.voltage, payload.current, payload.percentage], function (error) {
        if (error) winston.error('error in battery: ' + error);;
        winston.info('battery successfully inserted');
        ack('batteryACK', 0, ws, callback);
    });

}