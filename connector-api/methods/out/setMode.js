var moment = require('moment');
module.exports = function (ws, mode, callback) {
  var res = {
      mode: mode
  }
  callback(ws, "setMode", res);
}