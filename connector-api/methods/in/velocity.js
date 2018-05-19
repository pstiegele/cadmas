const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const velocityToClient = require('../../../client-api/methods/out/velocity');
const util = require('util');
const Websocket = require('ws');


module.exports = function (ws, payload, callback) {
    if (ws.activityID !== undefined && ws.activityID !== null) {
        var db = global.db;
        var query = "INSERT INTO VelocityTelemetry (activityID,timestamp,groundspeed,airspeed,climbrate,altitude) VALUES (?,?,?,?,?,?);";
        db.query(query, [ws.activityID, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), payload.groundspeed, payload.airspeed, payload.climbrate, payload.altitude], function (error) {
            if (error) winston.error('error in velocity: ' + error);
            winston.info('velocity successfully inserted');
            ack('velocityACK', 0, ws, callback);
        });
    }

    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
        global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
            winston.info("velocity sent to client");
            payload.droneID = ws.droneID;
            velocityToClient(value1, payload, function (ws, method, res) {
                res.time = require('moment')().unix();
                res.id = 0;
                res.method = method;
                if (value1.readyState === Websocket.OPEN) {
                    value1.send(JSON.stringify(res));
                }
            });

        });
    }

}