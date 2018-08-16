const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const missionState = require('../../../client-api/methods/out/missionState');
const Websocket = require('ws');


module.exports = function (ws, msg, callback) {
    var payload = msg.payload;
    if (ws.activeActivity !== undefined && ws.activeActivity !== null) {
        var db = global.db;
        var query = "INSERT INTO MissionStateTelemetry (activityID,timestamp,currentItem) VALUES (?,?,?);";
        db.query(query, [ws.activeActivity, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), payload.currentItem], function (error) {
            if (error){
                winston.error('error in missionState: ' + error);
                return;
            } 
            winston.info('missionState successfully inserted');
            ack('missionStateACK', msg.id, ws, callback);
        });
    }

    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
        global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
            winston.info("missionState sent to client");
            payload.droneID = ws.droneID;
            missionState(value1, payload);
        });
    }
}