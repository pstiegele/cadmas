const ack = require('../out/ack');
const util = require("util");
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const activity = require('../out/activity');

module.exports = function (ws, msg, callback) {
  var payload = msg.payload;
  var db = global.db;
  var query = "INSERT INTO Activity (missionID,droneID,name,state,note) VALUES (?,?,?,?,?);";
  db.query(query, [payload.missionID, payload.droneID, payload.name, payload.state, payload.note], function (error, result) {
    if (error) winston.error('error in addActivity: ' + error);
    winston.info('activity successfully inserted');
    var ackPayload = {
      ackToID: msg.id,
      activityID: result.insertId
    };
    ack('addActivityACK', ackPayload, ws, callback);

    //send new activity to every client
    if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
      global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
        winston.info("new activity sent to client");
        activity(value1, result.insertId, send, false);
      });
    }
  });





}