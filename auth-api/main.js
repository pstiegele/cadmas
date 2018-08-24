const jwt = require('jsonwebtoken');
const winston = require('../middleware/logger');

module.exports = function (wss) {
  wss.on('connection', function connection(ws, req) {
    winston.info("auth connected.");
    ws.on('message', function incoming(raw_msg) {
      var msg;
      try {
        msg = JSON.parse(raw_msg);
      } catch (e) {
        //ws.close();
        //evtl send invalidRequest?maybe?maybe not?
        return console.error(e);
      }
      getHandleMethod(msg.method)(ws, msg.payload, function (ws, msg) {
        msg.time = require('moment')().unix();
        msg.id = 0;
        ws.send(JSON.stringify(msg));
      });
    });

    ws.on('close', function (reason) {
      //TODO: handle close
    });
    ws.on('error', function error() {
      winston.error("error in auth-api: "+error);
    });

  });
}

function getHandleMethod(method) {
  switch (method) {
    case "authenticate":
      return require('./methods/in/authenticate.js')
      break;
    case "renewToken":
      return require('./methods/in/renewToken.js')
      break;
    // case "newDrone":
    //   return require('./methods/in/newDrone.js')
    //   break;
    default:
      return require('./methods/in/invaliRequest.js');
  }
}

function isValidToken(token) {
  try {
    var decoded = jwt.verify(token, process.env.JWTSECRET);
  } catch (error) {
    console.log(error);

    return false;
  }
  return false;
}
