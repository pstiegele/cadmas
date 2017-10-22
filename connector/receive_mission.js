module.exports = function(socket) {
  socket.on('test', function(msg) {
    console.log('received: ' + msg);
    socket.emit('test', 'Received: '+msg);
  });
}
