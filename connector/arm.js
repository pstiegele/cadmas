module.exports = function(socket) {
  socket.on('arm', function(msg) {
    console.log('received: ' + msg);
    socket.emit('test', 'Received: '+msg);
  });
}
