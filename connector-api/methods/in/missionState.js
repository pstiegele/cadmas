const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const missionStateToClient = require('../../../client-api/methods/out/missionState');
const Websocket = require('ws');


module.exports = function (ws, payload, callback) {
    if (ws.activityID !== undefined && ws.activityID !== null) {
        var db = global.db;
        var query = "INSERT INTO MissionStateTelemetry (activityID,timestamp,currentItem) VALUES (?,?,?);";
        db.query(query, [ws.activityID, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), payload.currentItem], function (error) {
            if (error) winston.error('error in missionState: ' + error);;
            winston.info('missionState successfully inserted');
            ack('missionStateACK', 0, ws, callback);
        });
    }

    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
        global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
            winston.info("missionState sent to client");
            payload.droneID = ws.droneID;
            missionStateToClient(value1, payload, function (ws, method, res) {
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