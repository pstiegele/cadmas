module.exports = function(socket) {
  socket.on('mytest', function(msg) {
    console.log('received: ' + msg);
    socket.emit('test', 'Received: '+msg);
  });
}
