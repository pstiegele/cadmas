var moment = require('moment');
const jwt = require('jsonwebtoken');
module.exports = function (authenticated, username, userID, ws, callback) {
  if (authenticated) {
    var token = jwt.sign({
      "sub": username,
      "userID": userID
    }, process.env.JWTSECRET);
    callback(ws, {
      "method": "authentication",
      "payload": {
        "successful": true,
        "token": token
      }
    });
  } else {
    callback(ws, {
      "method": "authentication",
      "payload": {
        "successful": false
      }
    });
  }
}