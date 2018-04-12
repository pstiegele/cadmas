const jwt = require('jsonwebtoken');

module.exports = function (wss) {
  wss.on('connection', function connection(ws, req) {
    
    var userID = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol].userID;
    var username = require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol].username;
    delete require("../middleware/checkAuthentication").getPertainInfosThroughConnectionProcess()[ws.protocol];
    console.log("client connected. userID: "+userID+" username: "+username);
    ws.on('message', function incoming(raw_msg) {
      //console.log('received: %s', msg);
      var msg;
      try {
        msg = JSON.parse(raw_msg);
      } catch (e) {
        return console.error(e);
      }
      if (msg.method === "authenticate") {
        require('./methods/in/authenticate.js')(ws, msg.payload, function (ws, msg) {
          msg.time = require('moment')().unix();
          msg.id = 0;
          ws.send(JSON.stringify(msg));
        });
      } else if (isValidToken(msg.token)) {
        getHandleMethod(msg.method)(ws, msg.payload);
      }
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
    case "renewToken":
      return require('./methods/in/renewToken.js')
      break;
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
      return require('./methods/invalidMethod.js');
  }
}

function isValidToken(token) {
 try {
  var decoded = jwt.verify(token,process.env.JWTSECRET);
 } catch (error) {
   console.log(error);
   
   return false;
 }
  return false;
}
