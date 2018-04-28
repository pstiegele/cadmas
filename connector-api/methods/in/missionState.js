const ack = require('../out/ack');
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
    var db = global.db;
    var query = "INSERT INTO MissionStateTelemetry (activityID,timestamp,currentItem) VALUES (?,?,?);";
    db.query(query, [3, payload.timestamp, payload.currentItem], function (error) {
        if (error) winston.error('error in missionState: ' + error);;
        winston.info('missionState successfully inserted');
        ack('missionStateACK', 0, ws, callback);
    });

}