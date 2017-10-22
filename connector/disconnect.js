module.exports = function(socket) {
    //var util = require("util");
    socket.on('disconnect', function() {
      console.log('Client disconnected')
    });
}
