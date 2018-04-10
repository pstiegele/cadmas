var moment = require('moment');
const jwt = require('jsonwebtoken');
module.exports = function(ws, req) {
  //TODO: only renew the token if there is a valid token in req (max. 14d of), if not: send renewToken failed
  var expires = moment().add(30, 'days').valueOf();
  var token = jwt.sign({
    "sub": req.username,
    "exp": expires
  }, process.env.JWTSECRET);
  res = {
    "authenticated": true,
    "token": token
  }
  ws.send(res);
}
