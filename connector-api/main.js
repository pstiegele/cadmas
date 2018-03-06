module.exports = function(io) {

  //var login = require('./login');

  var main = io.of('/connector');
  main.on('connection', function(socket) {
    console.log("Client to connector_api connected");
    socket.on('yes', function(msg) {
      console.log("got yes: " + msg);
      io.emit('log', msg);
    });
    //login(socket);

  });
}
