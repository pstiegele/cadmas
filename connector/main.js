module.exports = function(io) {

var disconnect = require('./disconnect');
var heartbeat = require('./heartbeat');
var test = require('./test');
var receive_route = require('./receive_route');
var arm = require('./arm');
var disarm = require('./disarm');
var start_route = require('./start_route');


  io.on('connection', function(socket) {
    console.log("Client connected");

    heartbeat(socket);
    disconnect(socket);
    test(socket);
    receive_route(socket);
    arm(socket);
    disarm(socket);
    start_route(socket);

  });
}
