var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "cadmas.cegpb2uou7a1.eu-west-1.rds.amazonaws.com",
    user: "server_user",
    password: "eua100DPME",
    port: "3306",
    database: "cadmas"
});


connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});





app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        var res = 'error';
        connection.query('Select name FROM Flight', function (err, result) {
            if (err) throw err;
            res = result[0].name;
            io.emit('chat message', res + ' ||| ' + msg);
        });
        
    });
});

http.listen(8081, function () {
    console.log('### CADMAS ###');
    console.log('');
    console.log('listening on *:8081');
});