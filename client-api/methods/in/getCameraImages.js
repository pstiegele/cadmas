const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const cameraImageZip = require('../out/cameraImageZip');


module.exports = function (ws, msg, callback) {
    var db = global.db;
    payload = msg.payload;
    cameraImageZip(ws, msg.id, payload.activityID, callback);

}