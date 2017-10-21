module.exports = function(socket) {
  socket.on('heartbeat', function() {
    console.log('heartbeat received')
  });
}
