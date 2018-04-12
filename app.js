const dotenv = require('dotenv').load();
var debug = require('debug')('cadmas:server');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const WebSocket = require('ws');
const url = require('url');
var app = express();
app.use(morgan('dev'));
global.db = require('./middleware/db.js')();
global.appRoot = path.resolve(__dirname);

//init server
var port;
var server = initalizeServer();
const connector_wss = new WebSocket.Server({noServer: true, verifyClient: require('./middleware/checkAuthentication.js').checkAuthentication});
const client_wss = new WebSocket.Server({noServer: true, verifyClient: require('./middleware/checkAuthentication.js').checkAuthentication});
const auth_wss = new WebSocket.Server({noServer: true});
initalizeWebsocket(server);

//connector API
var connector_api = require('./connector-api/main')(connector_wss);

//client API
var client_api = require('./client-api/main')(client_wss);

//auth API
var auth_api = require('./auth-api/main')(auth_wss);

// react setup
app.use(express.static(path.join(__dirname, 'cadmas-webclient', 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'cadmas-webclient', 'build', 'index.html'));
});

function initalizeWebsocket(server) {
  server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname;
    
    if (pathname === '/connector') {
      connector_wss.handleUpgrade(request, socket, head, (ws) => {
        connector_wss.emit('connection', ws);
      });
    } else if (pathname === '/client') {
      client_wss.handleUpgrade(request, socket, head, (ws) => {
        client_wss.emit('connection', ws);
      });
    } else if (pathname === '/auth') {
      auth_wss.handleUpgrade(request, socket, head, (ws) => {
        auth_wss.emit('connection', ws);
      });
    } else {
      socket.destroy();
    }
  });
}

function initalizeServer() {
  /**
   * Get port from environment and store in Express.
   */

  port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  var httpsServerOptions = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/cert.pem')
  }

  /**
   * Create HTTP server.
   */
  var server;
  var servertype;
  if (process.env.mode === "debug") {
    servertype = "http";
    server = http.createServer(app);
  } else {
    servertype = "https";
    server = https.createServer(httpsServerOptions, app);
  }

  /**
    * Listen on provided port, on all network interfaces.
    */

  server.listen(port, function() {
    console.log(new Date().toLocaleString() + ' cadmas ' + servertype + ' server is listening on port:\t' + port);
  });
  server.on('error', onError);
  server.on('listening', onListening);
  return server;
}

/**
  * Normalize a port into a number, string, or false.
  */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
  * Event listener for HTTP server "error" event.
  */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
  * Event listener for HTTP server "listening" event.
  */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
