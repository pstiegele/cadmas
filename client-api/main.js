const jwt = require('jsonwebtoken');
const winston = require('../middleware/logger');
const util = require('util');

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

      getHandleMethod(msg.method)(ws, msg.payload, function (ws, method, res) {
        res.time = require('moment')().unix();
        res.id = 0;
        res.method = method;
        if (ws.readyState === Websocket.OPEN)
          ws.send(JSON.stringify(res));
      });
    });

    ws.on('close', function (reason) {
      for (let i = 0; i < global.client_wss.cadmasClients[ws.userID].length; i++) {
        if(global.client_wss.cadmasClients[ws.userID][i]===this)
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
    case "updateActivity":
      return require('./methods/in/updateActivity.js')
      break;
    case "removeActivity":
      return require('./methods/in/removeActivity.js')
      break;
    case "addPayloadData":
      return require('./methods/in/addPayloadData.js')
      break;
    default:
      return require('./methods/out/invalidMethod.js');
  }
}

function send(ws, method, res) {
  res.time = require('moment')().unix();
  res.id = 0;
  res.method = method;
  winston.info("send: " + method);
  // winston.info("send: " + method + " --> " + JSON.stringify(res));
  ws.send(JSON.stringify(res));
}
function sendInitalData(ws) {
  require("./methods/out/user")(ws, send);
  require("./methods/out/missions")(ws, send);
  require("./methods/out/drones")(ws, send);
  require("./methods/out/activities")(ws, send);
  require("./methods/out/notifications")(ws, send);
  require("./methods/out/payloads")(ws, send);
  require("./methods/out/payloadDevices")(ws, send);
}