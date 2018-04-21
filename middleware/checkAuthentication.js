const url = require('url');
const jwt = require('jsonwebtoken');

var pertainInfosThroughConnectionProcess = {};


module.exports.checkAuthentication = function (token, saveUserInfos) {

  return jwt.verify(token, process.env.JWTSECRET, function (err, decoded) {
    if (err) return false;

    if (saveUserInfos) {
      pertainInfosThroughConnectionProcess[token] = {
        userID: decoded.userID,
        username: decoded.sub
      };
    }

    return true;
  });
}

module.exports.verifyClient = function (info) {
  let token = url.parse(info.req.url, true).query.token;
  return module.exports.checkAuthentication(token, true);
}

module.exports.getPertainInfosThroughConnectionProcess = function () {
  return pertainInfosThroughConnectionProcess;
}

