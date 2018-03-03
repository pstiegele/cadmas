const express = require('express');
const path = require('path');
const util = require('util');
const app = express();
var fs = require('fs');
var https = require('https');
var logger = require('morgan');


app.use(logger('dev'));

const port = process.env.HTTPSPORT || 443;

console.log('');
console.log('### CADMAS WEBSERVER ###');
console.log('');

/**
 * Identifies requests from clients that use http(unsecure) and
 * redirects them to the corresponding https(secure) end point.
 *
 * Identification of protocol is based on the value of non
 * standard http header 'X-Forwarded-Proto', which is set by
 * the proxy(in our case AWS ELB).
 * - when the header is undefined, it is a request sent by
 * the ELB health check.
 * - when the header is 'http' the request needs to be redirected
 * - when the header is 'https' the request is served.
 *
 * @param req the request object
 * @param res the response object
 * @param next the next middleware in chain
 */
const redirectionFilter = function(req, res, next) {
  const theDate = new Date();
  const receivedUrl = `${req.protocol}:\/\/${req.hostname}:${port}${req.url}`;

  if (req.get('X-Forwarded-Proto') === 'http') {
    const redirectTo = `https:\/\/${req.hostname}${req.url}`;
    console.log(`${theDate} Redirecting ${receivedUrl} --> ${redirectTo}`);
    res.redirect(301, redirectTo);
  } else {
    next();
  }
};

//if (process.env.SETUPHTTPSERVER === "true") {
// var http = require('http');
// var httpApp = express();
// var httpPort = process.env.HTTPPORT || '80';
// httpApp.set('port', httpPort);
// var httpServer = http.createServer(httpApp).listen(httpApp.get('port'), function() {
//   console.log('HTTP redirect server is listening on port:\t' + httpApp.get('port'));
// });
// httpApp.get('*', function(req, res) {
//   res.redirect("https://" + req.headers.host + req.path);
// });
//}

/**
 * Apply redirection filter to all requests
 */
//app.get('/*', redirectionFilter);

/**
 * Serve the static assets from 'build' directory
 */
app.use(express.static(path.join(__dirname, 'build')));

/**
 * When the static content for a request is not found,
 * serve 'index.html'. This case arises for Single Page
 * Applications.
 */
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//HTTPS Config
var httpsServerOptions = {
  key: fs.readFileSync('../keys/key.pem'),
  cert: fs.readFileSync('../keys/cert.pem')
}

https.createServer(httpsServerOptions, app).listen(port, function() {
  console.log(`Cadmas Webserver listening on ${port}...`);
});
