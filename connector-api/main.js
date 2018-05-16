const winston = require('../middleware/logger');
const util = require('util');

module.exports = function (wss) {
  wss.on('connection', function connection(ws, req) {
    
    ws.droneID = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcessDrone()[ws.protocol].droneID;
    ws.name = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcessDrone()[ws.protocol].name;
    delete require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcessDrone()[ws.protocol];
    winston.info("connector connected. droneID: " + ws.droneID + " name: " + ws.name);
    ws.on('message', function incoming(raw_msg) {
      ws.send("oh cool");
      console.log('received: %s', raw_msg);
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
