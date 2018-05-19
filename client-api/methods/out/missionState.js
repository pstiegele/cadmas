const winston = require('../../../middleware/logger');
module.exports = function (ws, payload, callback) {
    callback(ws, "missionState", { 'payload': payload });
}