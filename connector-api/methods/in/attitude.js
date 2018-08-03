const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const attitude = require('../../../client-api/methods/out/attitude');
const Websocket = require('ws');


module.exports = function (ws, payload, callback) {
    if (ws.activeActivity !== undefined && ws.activeActivity !== null) {
        var db = global.db;
        var query = "INSERT INTO AttitudeTelemetry (activityID,timestamp,pitch,roll,heading) VALUES (?,?,?,?,?);";
        db.query(query, [ws.activeActivity, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), payload.pitch, payload.roll, payload.heading], function (error) {
            if (error){
                winston.error('error in attitude: ' + error);
                return;
            } 
            winston.info('attitude successfully inserted');
            ack('attitudeACK', 0, ws, callback);
        });
    }

    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
        global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
            winston.info("attitude sent to client");
            payload.droneID = ws.droneID;
            attitude(value1, payload);
        });
    }

}

