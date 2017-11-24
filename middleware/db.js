const mongoose = require('mongoose');
var dbURI = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DB;

var promise = mongoose.connect(dbURI, {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

mongoose.connection.on('connected', function() {
  console.log('connected to database: ' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DB);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
  //insert reconnect?
});

mongoose.connection.on('disconnect', function() {
  console.log('Mongoose connection disconnected');
  //insert reconnect?
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose connection disconnected cause of node termination');
    process.exit(0);
  })
});
