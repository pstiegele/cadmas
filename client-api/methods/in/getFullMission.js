const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const mission = require('../out/mission');

module.exports = function (ws, msg, callback) {
    var db = global.db;
    payload = msg.payload;
    var ackPayload = {
        ackToID: msg.id
    };
    ack('getFullMissionACK', ackPayload, ws, callback);
    mission(ws, payload.missionID, true);

}