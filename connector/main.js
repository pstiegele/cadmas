module.exports = function(io) {

  var util = require("util");
  var heartbeat = require('./heartbeat');
  io.on('connection', function(socket) {
    console.log("Client connected");

    socket.on('disconnect', function() {
      console.log('Client disconnected')
    });

    socket.on('test', function(msg) {
      console.log('received: ' + msg);
      socket.emit('test', 'Received: '+msg);
    });

    socket.on('heartbeat', function(msg, callback) {
      console.log('heartbeat received: '+util.inspect(msg))
      var callback_data = {'time' : new Date().getTime()};
      callback(callback_data);
    });

  });
}
