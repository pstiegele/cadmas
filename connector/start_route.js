module.exports = function(socket) {
  socket.on('start_mission', function(msg) {
    console.log('received: ' + msg);
    socket.emit('test', 'Received: '+msg);
  });
}
