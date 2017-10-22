module.exports = function(io) {

var disconnect = require('./disconnect');
var heartbeat = require('./heartbeat');
var test = require('./test');
var receive_mission = require('./receive_mission');
var arm = require('./arm');
var disarm = require('./disarm');
var start_mission = require('./start_mission');


  io.on('connection', function(socket) {
    console.log("Client connected");

    heartbeat(socket);
    disconnect(socket);
    test(socket);
    receive_mission(socket);
    arm(socket);
    disarm(socket);
    start_mission(socket);

  });
}
