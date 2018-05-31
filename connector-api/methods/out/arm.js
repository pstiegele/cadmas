var moment = require('moment');
var send = require('../../main').send;
module.exports = function (ws) {
  send(ws, "arm");
}