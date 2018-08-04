const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const positionClient = require('../../../client-api/methods/out/position');
const Websocket = require('ws');


module.exports = function (ws, payload, callback) {
    if (ws.activeActivity !== undefined && ws.activeActivity !== null) {
        var db = global.db;
        var position = "POINT(" + payload.latitude + " " + payload.longitude + ")";
        var query = "INSERT INTO PositionTelemetry (activityID,timestamp,position, altitudeAbsolute,altitudeRelative) VALUES (?,?,ST_GeomFromText(?),?,?);";
        db.query(query, [ws.activeActivity, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), position, payload.altitudeAbsolute, payload.altitudeRelative], function (error) {
            if (error){
                winston.error('error in position: ' + error);
                return;
            } 
            winston.info('position successfully inserted');
            ack('positionACK', 0, ws, callback);
        });
    }

    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
        global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
            winston.info("position sent to client");
            payload.droneID = ws.droneID;
            positionClient(value1, payload);
        });
    }
}