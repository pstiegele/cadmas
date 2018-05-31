const ack = require('../out/ack');
const util = require("util");
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const activity = require('../out/activity');
const arm = require('../../../connector-api/methods/out/arm');


module.exports = function (ws, msg, callback) {
  var payload = msg.payload;
  var db = global.db;
  var query = "UPDATE Activity SET state=1 WHERE id=?";
  db.query(query, payload.activityID, function (error, result) {
    if (error) winston.error('error in startActivity: ' + error);
    winston.info('startActivity successfully executed');
    var ackPayload = {
      ackToID: msg.id
    };
    ack('startActivityACK', ackPayload, ws, callback);
    //send updated activity to every client
    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
      global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
        winston.info("start activity sent to client");
        activity(value1, payload.activityID, send);
      });
    }

  });



  var query = "SELECT droneID FROM Activity WHERE id=?";
  db.query(query, payload.activityID, function (error, result) {
    if (error || result.length !== 1) winston.error('error in stopActivity (in select droneID): ' + error);
    if (global.connector_wss.cadmasConnectors[result[0].droneID] !== undefined && global.connector_wss.cadmasConnectors[result[0].droneID] !== null) {
      arm(global.connector_wss.cadmasConnectors[result[0].droneID]);
    }

  });

}