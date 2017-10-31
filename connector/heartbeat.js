var db = require('../tools/db')();
var util = require("util");
module.exports = function(socket) {
  socket.on('heartbeat', function(msg, callback) {

    console.log('heartbeat received: ' + util.inspect(msg))

    //var query = 'INSERT INTO Telemetry (flightID, position, altitude, voltage, autopilot_connected, autopilot_mode, armed, routeVersion, airspeed, groundspeed, vsi, heading, active_waypointID, waypointsleft) VALUES '+
    //'(\'?\',ST_GeomFromText(\'POINT(1 1)\'),\'1\',\'1\',\'1\',\'1\',\'1\',\'1\',\'1\',\'1\',\'1\',\'1\',\'1\',\'1\')';
    //  console.log(query);
    var val = buildTelemetry(msg);
    var query = 'INSERT INTO Telemetry (' + val.col + ') VALUES (';
    for (i = 0; i < val.values.length; i++) {
      if (i != 0) {
        query += ',';
      }
      if(val.columns[i]!="position"){
      query += '?';
    }else{
      query += 'GeomFromText(?)';
    }

    }
    query += ')';
    console.log(query);
    db.query(query, val.values, function(err, results) {
      console.log(err);
      console.log(results);
    });
    var callback_data = {
      'time': new Date().getTime()
    };
    callback(callback_data);
  });
}

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
    values.push('POINT(' + telemetry.latitude+' '+telemetry.longitude + ')');
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
    col: columns.length ? columns.join(', ') : '1',
    values: values
  }
}
