module.exports = function(ws, req) {
  var res = '{"route1":"content1","route2":"content2"}';
  ws.send(res);
}
