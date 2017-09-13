var app = require('express')();
var http = require('http').Server(app);

app.get('/', function (req, res) {
    res.send('<h1>Hey Guys!</h1>');
});

http.listen(80, function () {
    console.log('listening on *:80');
})