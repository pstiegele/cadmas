var moment = require('moment');
var send = require('../../main').send;
module.exports = function (ws, mode) {
  send(ws, "setMode", { mode: mode });
}