const ack = require('../out/ack');
const util = require("util");
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const activity = require('../out/activity');
const setMode = require('../../../connector-api/methods/out/setMode');
const calibrate = require('../../../connector-api/methods/out/calibrate');
const setHomePosition = require('../../../connector-api/methods/out/setHomePosition');
const setMission = require('../../../connector-api/methods/out/setMission');
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



  var query = "SELECT droneID, missionID FROM Activity WHERE id=?";
  db.query(query, payload.activityID, function (error, result) {
    if (error || result.length !== 1) winston.error('error in startActivity (in select droneID): ' + error);
    if (global.connector_wss.cadmasConnectors[result[0].droneID] !== undefined && global.connector_wss.cadmasConnectors[result[0].droneID] !== null) {
      setMode(global.connector_wss.cadmasConnectors[result[0].droneID], "AUTO");
      calibrate(global.connector_wss.cadmasConnectors[result[0].droneID]);
      setMission(global.connector_wss.cadmasConnectors[result[0].droneID], result[0].missionID, function () {
        var homePointQuery = "SELECT location,altitude,type FROM MissionWaypoints WHERE missionIndex=0 AND type='HOMEPOINT' AND missionID=?";
        db.query(homePointQuery, payload.missionID, function (errorHomePoint, resultHomePoint) {
          if (errorHomePoint || resultHomePoint.length !== 1) {
            winston.error('error in startActivity (in select homePoint) (no homePoint found: ' + errorHomePoint);
            arm(global.connector_wss.cadmasConnectors[result[0].droneID]);
          } else {
            setHomePosition(global.connector_wss.cadmasConnectors[result[0].droneID], resultHomePoint[0].location.x, resultHomePoint[0].location.y, resultHomePoint[0].altitude, function () {
              arm(global.connector_wss.cadmasConnectors[result[0].droneID]);
            });
          }

        });

      });

    }

  });

}