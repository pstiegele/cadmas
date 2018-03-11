module.exports = function(req) {
  var res = '{"ok":"true"}';
  return res;
}

var db = require('../tools/db')();
var util = require("util");
module.exports = function(req) {
  console.log('heartbeat received: ' + util.inspect(req));
  //analyze telemetry parameter in heartbeat
  var val = buildTelemetry(msg);
  //build sql query to insert telemetry parameter
  var query = 'INSERT INTO Telemetry (' + val.names + ') VALUES (';
  for (i = 0; i < val.values.length; i++) {
    if (i != 0) {
      query += ',';
    }
    if (val.columns[i] != "position") {
      query += '?';
    } else {
      query += 'GeomFromText(?)';
    }

  }
  query += ')';

  db.query(query, val.values, function(err, results) {
    var successful = false;
    if (err === null) {
      successful = true;
    } else {
      console.log(err);
      successful = false;
    }
    var callback_data = {
      'time': new Date().getTime(),
      'successful': successful
    };
    callback(callback_data);
  });

});
}

//inserts defined telemetry params name in columns, belonging values in values
//and return them
//columns[]: array of parameter names
//names: String of all parameter names
//values[]: array of all values in parameter names order
function buildTelemetry(msg) {
var telemetry = msg.telemetry;
var columns = [];
var values = [];

if (typeof msg.time !== 'undefined') {
  columns.push("dt_occured")
  values.push(new Date(msg.time));
}
if (typeof telemetry.flightID !== 'undefined') {
  columns.push("flightID")
  values.push(telemetry.flightID);
}
if (typeof telemetry.latitude !== 'undefined' && typeof telemetry.longitude !== 'undefined') {
  columns.push("position")
  values.push('POINT(' + telemetry.latitude + ' ' + telemetry.longitude + ')');
  //values.push({ lat: 1, long: 4});
}
if (typeof telemetry.altitude !== 'undefined') {
  columns.push("altitude")
  values.push(telemetry.altitude);
}
if (typeof telemetry.voltage !== 'undefined') {
  columns.push("voltage")
  values.push(telemetry.voltage);
}
if (typeof telemetry.autopilot_connected !== 'undefined') {
  columns.push("autopilot_connected")
  values.push(telemetry.autopilot_connected);
}
if (typeof telemetry.autopilot_mode !== 'undefined') {
  columns.push("autopilot_mode")
  values.push(telemetry.autopilot_mode);
}
if (typeof telemetry.armed !== 'undefined') {
  columns.push("armed")
  values.push(telemetry.armed);
}
if (typeof telemetry.routeVersion !== 'undefined') {
  columns.push("routeVersion")
  values.push(telemetry.routeVersion);
}
if (typeof telemetry.airspeed !== 'undefined') {
  columns.push("airspeed")
  values.push(telemetry.airspeed);
}
if (typeof telemetry.groundspeed !== 'undefined') {
  columns.push("groundspeed")
  values.push(telemetry.groundspeed);
}
if (typeof telemetry.vsi !== 'undefined') {
  columns.push("vsi")
  values.push(telemetry.vsi);
}
if (typeof telemetry.heading !== 'undefined') {
  columns.push("heading")
  values.push(telemetry.heading);
}
if (typeof telemetry.active_waypointID !== 'undefined') {
  columns.push("active_waypointID")
  values.push(telemetry.active_waypointID);
}
if (typeof telemetry.waypointsleft !== 'undefined') {
  columns.push("waypointsleft")
  values.push(telemetry.waypointsleft);
}

return {
  columns: columns,
  names: columns.length
    ? columns.join(', ')
    : '1',
  values: values
}
}
