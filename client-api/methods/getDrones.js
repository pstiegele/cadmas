module.exports = function(ws, req) {
  var res = '{"drone1":{"name":"MyDrone","id":"123","version":"456"},"drone2":{"name":"MySecondDrone","id":"42","version":"1"}}';
  ws.send(res);
}
