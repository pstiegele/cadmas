var moment = require('moment');
const jwt = require('jsonwebtoken');
module.exports = function (method, msgID, ws, callback) {
  var res = {
    'ackToID': msgID
  };
  callback(ws, method, res);
}