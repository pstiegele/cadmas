var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var cors = require('cors');
var errorhandler = require('errorhandler');



var isProduction = process.env.NODE_ENV === 'production';

//express config
app.use(require('morgan')('dev'));
app.use(cors());
app.use(require('method-override')());
//app.use(express.static(__dirname + '/public'));


if (isProduction) {
    //different db
    app.use(errorhandler());
} else {
    //local db
}


//load custom modules
require('./models/Flight');


//define routes
app.use(require('./routes'));



//catch 404
app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

//debug error handler

if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

//production eror handler
app.use(function(err,req,res,next){
  res.status(err.status || 500),
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DB
});


connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //console.log('Connected to database');
});





// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });


// io.on('connection', function (socket) {
//     console.log('a user connected');
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
//     socket.on('chat message', function (msg) {
//         var res = 'error';
//         connection.query('Select name FROM Flight', function (err, result) {
//             if (err) throw err;
//             res = result[0].name;
//             io.emit('chat message', res + ' ||| ' + msg);
//         });
//
//     });
// });

app.listen(process.env.PORT || 3000, function () {
    console.log('');
    console.log('### CADMAS ###');
    console.log('');
    console.log('listening on *:'+(process.env.PORT || 3000));
});
