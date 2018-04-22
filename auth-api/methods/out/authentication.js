var moment = require('moment');
const jwt = require('jsonwebtoken');
module.exports = function (authenticated, username, userID, ws, callback) {
  if (authenticated) {
    var expires = moment().add(30, 'days').valueOf();  
    var token = jwt.sign({
      "sub": username,
      "exp": expires,
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