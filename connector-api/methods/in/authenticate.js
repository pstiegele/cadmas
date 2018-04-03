var moment = require('moment');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = function(ws, req) {
  var db = global.db;
  return authIsValid(req.username, req.password, function(authenticated) {
    var res;
    if (authenticated) {
      var expires = moment().add(30, 'days').valueOf();
      var token = jwt.sign({
        "sub": req.username,
        "droneID": 1,
        "exp": expires
      }, process.env.JWTSECRET);
      res = {
        "time": moment().unix(),
        "method": "authenticate",
        "payload": {
          "authenticated": true,
          "token": token
        }
      }
    } else {
      res = {
        "time": moment().unix(),
        "method": "authenticate",
        "payload": {
          "authenticated": false
        }
      }
    }
    ws.send(JSON.stringify(res));
  });

}

function authIsValid(user, password, callback) {
  if (user && password) {
    var query = "SELECT * FROM User WHERE username=?";
    db.query(query, user, function(err, results) {
      if (err === null && results.length == 1) {
        bcrypt.compare(password, results[0].password, function(err, res) {
          if (res) {
            callback(true);
          } else {
            callback(false);
          }
        });

      } else {
        callback(false);
      }
    });
  } else {
    callback(false);
  }
}
