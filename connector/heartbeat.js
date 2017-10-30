module.exports = function(socket) {
    var util = require("util");
  socket.on('heartbeat', function(msg, callback) {
    console.log('heartbeat received: '+util.inspect(msg))

    var callback_data = {'time' : new Date().getTime()};
    callback(callback_data);
  });
}
