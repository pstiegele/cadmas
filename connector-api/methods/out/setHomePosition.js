var moment = require('moment');
var send = require('../../main').send;
module.exports = function (ws, latitude, longitude, altitude, callback) {
    //console.log("My HOME POINT DATA: "+latitude+" long: "+longitude+" alt: "+altitude);
    var payload = {
        latitude: latitude,
        longitude: longitude,
        altitude: altitude
    };
  send(ws, "setHomePosition", payload);
  callback();
}