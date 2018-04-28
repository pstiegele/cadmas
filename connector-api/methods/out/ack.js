var moment = require('moment');
module.exports = function (method, msgID, ws, callback) {
  var res = {
    'ackToID': msgID
  };
  callback(ws, method, res);
}