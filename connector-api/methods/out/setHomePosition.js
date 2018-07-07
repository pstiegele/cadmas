var moment = require('moment');
var send = require('../../main').send;
module.exports = function (ws, latitude, longitude, altitude, callback) {
    var payload = {
        latitude: latitude,
        longitude: longitude,
        altitude: altitude
    };
  send(ws, "setHomePosition",);
  callback();
}