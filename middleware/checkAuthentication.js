const url = require('url');
const jwt = require('jsonwebtoken');
const winston = require('./logger');


var pertainInfosThroughConnectionProcess = {};
var pertainInfosThroughConnectionProcessDrone = {};


module.exports.checkAuthenticationToken = function (token, saveUserInfos) {
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

module.exports.checkAuthenticationAPIKey = function(apikey,saveDroneInfos, callback){
  var db = global.db;
    var query = "SELECT id, name FROM Drone WHERE apikey = ?";
    db.query(query, apikey, function (error, results) {
      if (error) winston.error('error in checkAuthenticationAPIKey: ' + error);
        
        if(results.length===1){
          if (saveDroneInfos) {
            pertainInfosThroughConnectionProcessDrone[apikey] = {
              droneID: results[0].id,
              name: results[0].name
            };
          }
          callback(true);
        }else{
          winston.info('apikey from connector is not valid');
          callback(false);
        }
    });
}


module.exports.verifyClient = function (info) {
  let token = url.parse(info.req.url, true).query.token || "";
  return module.exports.checkAuthenticationToken(token, true);
}
module.exports.verifyConnector = function (info, cb) {
  let apikey = url.parse(info.req.url, true).query.apikey || "";
  module.exports.checkAuthenticationAPIKey(apikey, true, cb);
}

module.exports.getPertainInfosThroughConnectionProcess = function () {
  return pertainInfosThroughConnectionProcess;
}
module.exports.getPertainInfosThroughConnectionProcessDrone = function () {
  return pertainInfosThroughConnectionProcessDrone;
}

