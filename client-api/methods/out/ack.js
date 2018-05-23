var moment = require('moment');
const jwt = require('jsonwebtoken');
module.exports = function (method, payload, ws, callback) {
  callback(ws, method, payload);
}