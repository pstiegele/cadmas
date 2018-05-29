const ack = require('../out/ack');
const util = require("util");
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const setModeToClient = require('../../../connector-api/methods/out/setMode');
const Websocket = require('ws');


module.exports = function (ws, msg, callback) {
  var payload = msg.payload;
  var db = global.db;
  var query = "UPDATE Activity SET state=1 WHERE id=?";
//   db.query(query, payload.activityID, function (error, result) {
//     if (error) winston.error('error in startActivity: ' + error);
//     winston.info('startActivity successfully executed');
     var ackPayload = {
       ackToID: msg.id
     };
    ack('setModeACK', ackPayload, ws, callback);

    //send updated activity to every client
    // if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
    //   global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
    //     winston.info("setMode sent to client");
    //     activity(value1, payload.mode, send);
    //   });
    // }

    if (global.connector_wss.cadmasConnectors[payload.droneID] !== undefined && global.connector_wss.cadmasConnectors[payload.droneID] !== null) {
            winston.info("setMode sent to client");
            //payload.droneID = ws.droneID;
            setModeToClient(global.connector_wss.cadmasConnectors[payload.droneID], payload.mode, function (ws, method, res) {
                res.time = require('moment')().unix();
                res.id = 0;
                res.method = method;
                if (global.connector_wss.cadmasConnectors[payload.droneID].readyState === Websocket.OPEN) {
                    global.connector_wss.cadmasConnectors[payload.droneID].send(JSON.stringify(res));
                }

            });
    }


 // });





}