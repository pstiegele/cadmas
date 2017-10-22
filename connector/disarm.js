module.exports = function(socket) {
  socket.on('disarm', function(msg) {
    console.log('received: ' + msg);
    socket.emit('test', 'Received: '+msg);
  });
}
