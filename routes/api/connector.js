module.exports = function(io){

  require('net').createServer(function (socket) {
      console.log("connected");

      socket.on('data', function (data) {
          console.log(data);
          socket.write("you send: "+data);
      });
  })

  .listen(63721);

  // var net = require('net');
  //
  // var client = net.connect(1010, 'localhost');
  //
  // client.write('Hello from node.js');
  //
  // client.end();
  //
  //
    var app = require('express');
    var router = app.Router();
//
//   io.on('connection', function(socket){
//     console.log("Client connected");
//     socket.emit('ps','gude');
// socket.on('disconnect', function(){
//   console.log('Client disconnected')
// });
//
//     socket.on('ps', function(msg){
//       console.log('message: ' + msg);
//     });
//
//   });


  // router.get('/', function(req, res, next) {
  //     res.send('<html><head></head><body><script src=\"/socket.io/socket.io.js\"></script><script>var socket = io();</script></body></html>');
  // });


  return router;
}
