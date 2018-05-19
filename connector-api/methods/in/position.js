const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const positionToClient = require('../../../client-api/methods/out/position');
const Websocket = require('ws');


module.exports = function (ws, payload, callback) {
    if (ws.activityID !== undefined && ws.activityID !== null) {
        var db = global.db;
        var position = "POINT(" + payload.latitude + " " + payload.longitude + ")";
        winston.info("position: " + position);
        var query = "INSERT INTO PositionTelemetry (activityID,timestamp,position, altitude) VALUES (?,?,ST_GeomFromText(?),?);";
        db.query(query, [ws.activityID, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), position, payload.altitude], function (error) {
            if (error) winston.error('error in position: ' + error);
            winston.info('position successfully inserted');
            ack('positionACK', 0, ws, callback);
        });
    }

    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
        global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
            winston.info("position sent to client");
            payload.droneID = ws.droneID;
            positionToClient(value1, payload, function (ws, method, res) {
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