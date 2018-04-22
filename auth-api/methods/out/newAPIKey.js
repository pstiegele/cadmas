var moment = require('moment');
const jwt = require('jsonwebtoken');
module.exports = function (authenticated, userID, ws, callback) {
  if (authenticated) {
    var expires = moment().add(100, 'years').valueOf();  
    var apikey = jwt.sign({
      "sub": username,
      "exp": expires,
      "userID": userID
    }, process.env.JWTSECRET);
    callback(ws, {
      "method": "newAPIKey",
      "payload": {
        "successful": true,
        "apikey": apikey
      }
    });
  } else {
    callback(ws, {
      "method": "newAPIKey",
      "payload": {
        "successful": false
      }
    });
  }
}