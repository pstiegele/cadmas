const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const activity = require('../out/activity');

module.exports = function (ws, msg, callback) {
    var db = global.db;
    payload = msg.payload;
    var ackPayload = {
        ackToID: msg.id
    };
    ack('getFullActivityACK', ackPayload, ws, callback);
    activity(ws, payload.activityID, true);

}