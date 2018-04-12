const url = require('url');
const jwt = require('jsonwebtoken');

var pertainInfosThroughConnectionProcess = {};


module.exports.checkAuthentication= function (info) {
  let query = url.parse(info.req.url, true).query;
  return jwt.verify(query.token, process.env.JWTSECRET, function (err, decoded) {
    if (err) return false;

    pertainInfosThroughConnectionProcess[query.token] = {
      userID: decoded.userID,
      username: decoded.sub
    };
    return true;
  });
}

module.exports.getPertainInfosThroughConnectionProcess = function(){
  return pertainInfosThroughConnectionProcess;
}

