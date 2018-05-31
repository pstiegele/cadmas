const ack = require('../out/ack');
const util = require("util");
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const activity = require('../out/activity');
const disarm = require('../../../connector-api/methods/out/disarm');

module.exports = function (ws, msg, callback) {
    var payload = msg.payload;
    var db = global.db;
    var query = "UPDATE Activity SET state=2 WHERE id=?";
    db.query(query, payload.activityID, function (error, result) {
        if (error) winston.error('error in stopActivity: ' + error);
        winston.info('stopActivity successfully executed');
        var ackPayload = {
            ackToID: msg.id
        };
        ack('stopActivityACK', ackPayload, ws, callback);

        //transmit updated activity to every client
        if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
            global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
                winston.info("stop activity transmitted to client");
                activity(value1, payload.activityID, send);
            });
        }
    });

    var query = "SELECT droneID FROM Activity WHERE id=?";
    db.query(query, payload.activityID, function (error, result) {
        if (error || result.length !== 1) winston.error('error in stopActivity (in select droneID): ' + error);
        if (global.connector_wss.cadmasConnectors[result[0].droneID] !== undefined && global.connector_wss.cadmasConnectors[result[0].droneID] !== null) {
            disarm(global.connector_wss.cadmasConnectors[result[0].droneID]);
        }

    });

}