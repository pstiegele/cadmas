const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const velocity = require('../../../client-api/methods/out/velocity');
const util = require('util');
const Websocket = require('ws');


module.exports = function (ws, payload, callback) {
    if (ws.activeActivity !== undefined && ws.activeActivity !== null) {
        var db = global.db;
        var query = "INSERT INTO VelocityTelemetry (activityID,timestamp,groundspeed,airspeed,climbrate) VALUES (?,?,?,?,?);";
        db.query(query, [ws.activeActivity, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), payload.groundspeed, payload.airspeed, payload.climbrate], function (error) {
            if (error) winston.error('error in velocity: ' + error);
            winston.info('velocity successfully inserted');
            ack('velocityACK', 0, ws, callback);
        });
    }

    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
        global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
            winston.info("velocity sent to client");
            payload.droneID = ws.droneID;
            velocity(value1, payload);
        });
    }

}