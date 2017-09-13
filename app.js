var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World, Paul!');
});

app.listen(80, function () {
    console.log('Example app on port 80');
});