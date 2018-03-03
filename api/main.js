module.exports = function(io) {

var login = require('./login');

var main = io.of('/api');
  main.on('connection', function(socket) {
    console.log("Client connected");


    login(socket);

  });
}
