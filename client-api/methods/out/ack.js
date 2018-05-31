var moment = require('moment');
const jwt = require('jsonwebtoken');
const send = require("../../main").send;

module.exports = function (method, payload, ws) {
  send(ws, method, payload);
}