const jwt = require('jsonwebtoken');
const winston = require('../middleware/logger');
const util = require('util');

module.exports = function (wss) {
  wss.on('connection', function connection(ws, req) {
    ws.userID = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol].userID;
    ws.username = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol].username;
    delete require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol];
    winston.info("client connected. userID: " + ws.userID + " username: " + ws.username);
    sendInitalData(ws);
    //winston.info("clients: "+util.inspect(wss.clients));
    ws.on('message', function incoming(raw_msg) {
      winston.info("msg from client ("+ws.username+"): "+raw_msg);
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
        ws.send(JSON.stringify(res));
      });
    });

    ws.on('close', function (reason) {
      //TODO: handle close
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
    default:
      return require('./methods/out/invalidMethod.js');
  }
}

function send(ws,method,res){
  res.time = require('moment')().unix();
  res.id = 0;
  res.method = method;
  winston.info("send: "+method+" --> "+res);
  ws.send(JSON.stringify(res));
}
function  sendInitalData(ws){
  require("./methods/out/activities")(ws, send);
  require("./methods/out/missions")(ws,send);
  require("./methods/out/drones")(ws,send);
  require("./methods/out/notifications")(ws,send);
  require("./methods/out/user")(ws,send);
}