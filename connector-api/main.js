module.exports = function(wss) {
  wss.on('connection', function connection(ws, req) {
    //  const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    //console.log("client connected: " + JSON.stringify(location));
    console.log("connector-client connected");
    ws.on('message', function incoming(raw_msg) {
      console.log('received: %s', raw_msg);
      var msg;
      try {
        msg = JSON.parse(raw_msg);
      } catch (e) {
        return console.error(e);
      }
      if (isValidAPIKey(msg.apikey)) {
        getHandleMethod(msg.method)(ws, msg.payload);
      } else {
        console.log("Invalid apikey");
      }
    });

    ws.on('close', function(reason) {
      //TODO: handle close
    });
    ws.on('error', function error() {
      //TODO handle error
    });

    res = {
      "method": "heartbeat"
    }
    ws.send(JSON.stringify(res));
  });
}

function getHandleMethod(method) {
  switch (method) {
    case "heartbeat":
      return require('./methods/in/heartbeat.js')
      break;
    case "getMission":
      return require('./methods/out/newMission.js')
      break;
    default:
      return require('./methods/invalidMethod.js');
  }
}

function isValidAPIKey(apikey) {
  var query = "SELECT id FROM Drone WHERE apikey=?";
  db.query(query, apikey, function(err, results) {
    if (err === null & results.length == 1) {
      return true;
    }
  });
  return false;
}
