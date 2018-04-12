var bcrypt = require('bcryptjs');
var authentication = require('../out/authentication');
module.exports = function (ws, req, callback) {
  var db = global.db;
  authIsValid(req.username, req.password, function (authenticated, userID) {
    return authentication(authenticated, req.username, userID, ws, callback);
  });

}

function authIsValid(user, password, callback) {
  if (user && password) {
    var query = "SELECT * FROM User WHERE username=?";
    db.query(query, user, function (err, results) {
      if (err === null && results.length == 1) {
        bcrypt.compare(password, results[0].password, function (err, res) {
          if (res) {
            callback(true,results[0].id);
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
