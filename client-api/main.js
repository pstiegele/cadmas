module.exports = function(wss) {
  wss.on('connection', function connection(ws, req) {
    //  const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    //console.log("client connected: " + JSON.stringify(location));
    console.log("client-client connected");
    ws.on('message', function incoming(raw_msg) {
      //console.log('received: %s', msg);
      var msg;
      try {
        msg = JSON.parse(raw_msg);
      } catch (e) {
        return console.error(e);
      }
      if (isValidToken(msg.token)) {
        var res = getHandleMethod(msg.method)(msg.payload);
        ws.send(res);
      }
    });

    ws.on('close', function(reason) {
      //TODO: handle close
    });
    ws.on('error', function error() {
      //TODO handle error
    });

    ws.send('Welcome stranger!');
  });
}

function getHandleMethod(method) {
  switch (method) {
    case "getDrones":
      return require('./methods/getDrones.js')
      break;
    case "getRoutes":
      return require('./methods/getRoutes.js')
      break;
    default:
      return require('./methods/invalidMethod.js');
  }
}

function isValidToken(token) {
  //TODO: verify token
  return true;
}
