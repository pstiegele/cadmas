module.exports = function(socket) {
  socket.on('receive_mission', function(msg) {
    console.log('received: ' + msg);
    socket.emit('test', 'Received: '+msg);
  });
}
