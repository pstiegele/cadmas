const winston = require('../middleware/logger');
const util = require('util');
const Websocket = require('ws');
const drone = require('../client-api/methods/out/drone');

var msgID = 0;
module.exports = function (wss) {
  wss.on('connection', function connection(ws, req) {
    ws.droneID = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcessDrone()[ws.protocol].droneID;
    ws.name = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcessDrone()[ws.protocol].name;
    getUserIDByDroneID(ws);
    getActiveActivity(ws);
    delete require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcessDrone()[ws.protocol];
    winston.info("connector connected. droneID: " + ws.droneID + " name: " + ws.name);
    global.connector_wss.cadmasConnectors[ws.droneID] = ws;
   
    ws.on('message', function incoming(raw_msg) {

      var msg;
      try {
        msg = JSON.parse(raw_msg);
        if (msg.method === "cameraImage") {
          winston.info('received: %s', msg.method);
        } else {
          winston.info('received: %s', util.inspect(msg));
        }
      } catch (e) {
        return console.error(e);
      }
      getHandleMethod(msg.method)(ws, msg.payload, send);
    });

    ws.on('close', function (reason) {
      delete global.connector_wss.cadmasConnectors[ws.droneID];
      notifyClients(ws);
      winston.info("connector connection closed. droneID: " + ws.droneID + " name: " + ws.name);

    });
    ws.on('error', function error() {
      //TODO handle error
    });
  });
}

function send(ws, method, payload) {
  var res = {
    time: require('moment')().unix(),
    id: getMsgID(),
    method: method,
    payload: payload
  }
  if (ws.readyState === Websocket.OPEN) {
    winston.info("send: " + method);
    ws.send(JSON.stringify(res));
  } else {
    winston.info("connector closed connection while trying to send data (" + method + ")");
  }

}
module.exports.send = send;

function getMsgID() {
  if (msgID > Number.MAX_SAFE_INTEGER) {
    msgID = 0;
  }
  return msgID++;
}

function getHandleMethod(method) {
  switch (method) {
    case "attitude":
      return require('./methods/in/attitude.js')
      break;
    case "battery":
      return require('./methods/in/battery.js')
      break;
    case "heartbeat":
      return require('./methods/in/heartbeat.js')
      break;
    case "missionState":
      return require('./methods/in/missionState.js')
      break;
    case "position":
      return require('./methods/in/position.js')
      break;
    case "velocity":
      return require('./methods/in/velocity.js')
      break;
    case "getMission":
      return require('./methods/out/newMission.js')
      break;
    case "cameraImage":
      return require('./methods/in/cameraImage.js');
      break;
    default:
      return require('./methods/invalidMethod.js');
  }
}

function isValidAPIKey(apikey, callback) {
  var query = "SELECT id FROM Drone WHERE apikey=?";
  console.log("apikey: " + apikey);
  db.query(query, apikey, function (err, results) {
    console.log("length: " + results.length);
    console.log("err: " + err);
    if (err === null && results.length == 1) {
      console.log("wird betreten");
      callback();
    }
  });
}

function getUserIDByDroneID(ws) {
  var query = "SELECT userID FROM Drone WHERE id=?";
  db.query(query, ws.droneID, function (err, results) {
    if (err === null && results.length == 1) {
      ws.userID = results[0].userID;
      notifyClients(ws);
    }
  });
}

function getActiveActivity(ws) {
  var queryGetActiveActivity = "SELECT activeActivity FROM Drone LEFT JOIN Activity ON Drone.activeActivity=Activity.id WHERE Drone.id=? AND state=1";
  db.query(queryGetActiveActivity, ws.droneID, function (errActiveActivity, resultsActiveActivity) {
    if (errActiveActivity === null && resultsActiveActivity.length == 1) {
      ws.activeActivity = resultsActiveActivity[0].activeActivity;
      winston.info("activeActivity: " + ws.activeActivity);
    }
  });
}

function notifyClients(ws) {
  if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
    global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
      winston.info("notify client about drone");
      drone(value1, ws.droneID);
    });
  }
}