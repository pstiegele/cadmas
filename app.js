//required modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io')();


//website modules
var index = require('./routes/index');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var newRoute = require('./routes/newRoute');
var routes = require('./routes/routes');
var route = require('./routes/route');
var flights = require('./routes/flights');
var flight = require('./routes/flight');
var drones = require('./routes/drones');
var drone = require('./routes/drone');
var user = require('./routes/user');
var settings = require('./routes/settings');

//api modules
var api_flights = require('./routes/api/flights');
var api_routes = require('./routes/api/routes');
var api_user = require('./routes/api/user');
var api_drones = require('./routes/api/drones');
var api_payloadDevices = require('./routes/api/payloadDevices');
var api_logs = require('./routes/api/logs');

var connector = require('./connector/main')(io);


//create app
var app = express();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//website routes
app.use('/', index);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/newRoute', newRoute);
app.use('/routes', routes);
app.use('/route', route);
app.use('/flights', flights);
app.use('/flight', flight);
app.use('/drones', drones);
app.use('/drone', drone);
app.use('/user', user);
app.use('/settings', settings);



//api routes
app.use('/api/flights', api_flights);
app.use('/api/routes', api_routes);
app.use('/api/user', api_user);
app.use('/api/drones', api_drones);
app.use('/api/payloadDevices', api_payloadDevices);
app.use('/api/logs', api_logs);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
