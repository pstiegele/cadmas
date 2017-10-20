module.exports = function(io){
  var app = require('express');
  var router = app.Router();

  io.on('connection', function(socket){
    console.log("Client connected");
    socket.emit('ps','gude');
socket.on('disconnect', function(){
  console.log('Client disconnected')
});

    socket.on('ps', function(msg){
      console.log('message: ' + msg);
    });

  });


  router.get('/', function(req, res, next) {
      res.send('<html><head></head><body><script src=\"/socket.io/socket.io.js\"></script><script>var socket = io();</script></body></html>');
  });


  return router;
}
