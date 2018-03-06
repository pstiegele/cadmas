module.exports = function(io) {

  //var login = require('./login');

  var main = io.of('/client');
  main.on('connection', function(socket) {
    console.log("Client to webclient_api connected");
    io.emit('log', "hey");
    //  login(socket);

  });
}
