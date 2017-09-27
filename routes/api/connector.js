module.exports = function(io){
  var app = require('express');
  var router = app.Router();

  io.on('connection', function(socket){
    console.log("hi, hat funktioniert!");
  });

  router.get('/', function(req, res, next) {
    // io.on('connection', function(socket){
    //   console.log('user connected');
    // });


    res.send('<html><head></head><body><script src=\"/socket.io/socket.io.js\"></script><script>var socket = io();</script></body></html>');
  });


  return router;
}
