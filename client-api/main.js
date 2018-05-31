const jwt = require('jsonwebtoken');
const winston = require('../middleware/logger');
const util = require('util');
const Websocket = require('ws');


var msgID = 0;
module.exports = function (wss) {
  wss.on('connection', function connection(ws, req) {
    ws.userID = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol].userID;
    ws.username = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol].username;
    delete require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol];
    winston.info("client connected. userID: " + ws.userID + " username: " + ws.username);
    if (global.client_wss.cadmasClients[ws.userID] === undefined || global.client_wss.cadmasClients[ws.userID] === null) {
      global.client_wss.cadmasClients[ws.userID] = [];
    }
    var pos = global.client_wss.cadmasClients[ws.userID].length;
    for (let i = 0; i < global.client_wss.cadmasClients[ws.userID].length; i++) {
      if (global.client_wss.cadmasClients[ws.userID][i] === null) {
        pos = i;
        break;
      }
    }
    global.client_wss.cadmasClients[ws.userID][pos] = ws;
    sendInitalData(ws);
    //winston.info("clients: "+util.inspect(wss.clients));
    ws.on('message', function incoming(raw_msg) {
      winston.info("msg from client (" + ws.username + "): " + raw_msg);
      var msg;
      try {
        msg = JSON.parse(raw_msg);
      } catch (e) {
        return console.error(e);
      }
      getHandleMethod(msg.method)(ws, msg);
    });

    ws.on('close', function (reason) {
      for (let i = 0; i < global.client_wss.cadmasClients[ws.userID].length; i++) {
        if (global.client_wss.cadmasClients[ws.userID][i] === this)
          delete global.client_wss.cadmasClients[ws.userID][i];
      }
    });
    ws.on('error', function error() {
      //TODO handle error
    });

  });
}

function getHandleMethod(method) {
  switch (method) {
    case "subscribeActivity":
      return require('./methods/in/subscribeActivity.js')
      break;
    case "unsubscribeActivity":
      return require('./methods/in/unsubscribeActivity.js')
      break;
    case "subscribeMission":
      return require('./methods/in/subscribeMission.js')
      break;
    case "unsubscribeMission":
      return require('./methods/in/unsubscribeMission.js')
      break;
    case "addMission":
      return require('./methods/in/addMission.js')
      break;
    case "updateMission":
      return require('./methods/in/updateMission.js')
      break;
    case "removeMission":
      return require('./methods/in/removeMission.js')
      break;
    case "addMissionWaypoint":
      return require('./methods/in/addMissionWaypoint.js')
      break;
    case "updateMissionWaypoint":
      return require('./methods/in/updateMissionWaypoint.js')
      break;
    case "removeMissionWaypoint":
      return require('./methods/in/removeMissionWaypoint.js')
      break;
    case "addActivity":
      return require('./methods/in/addActivity.js')
      break;
    case "startActivity":
      return require('./methods/in/startActivity.js')
      break;
    case "stopActivity":
      return require('./methods/in/stopActivity.js')
      break;
    case "updateActivity":
      return require('./methods/in/updateActivity.js')
      break;
    case "removeActivity":
      return require('./methods/in/removeActivity.js')
      break;
    case "addPayloadData":
      return require('./methods/in/addPayloadData.js')
      break;
    case "setMode":
      return require('./methods/in/setMode.js')
      break;
    default:
      return require('./methods/out/invalidMethod.js');
  }
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
    winston.info("client closed connection while trying to send data (" + method + ")");
  }

}
module.exports.send = send;

function sendInitalData(ws) {
  require("./methods/out/user")(ws);
  require("./methods/out/missions")(ws);
  require("./methods/out/drones")(ws);
  require("./methods/out/activities")(ws);
  require("./methods/out/notifications")(ws);
  require("./methods/out/payloads")(ws);
  require("./methods/out/payloadDevices")(ws);
}

function getMsgID() {
  if (msgID > Number.MAX_SAFE_INTEGER) {
    msgID = 0;
  }
  return msgID++;
}