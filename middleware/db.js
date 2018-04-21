var mysql = require('mysql');
  const winston = require('./logger');
var db;
module.exports = function() {
  if (!db) {
    db = mysql.createPool({connectionLimit: 10,host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, port: process.env.DB_PORT, database: process.env.DB_DB});
    db.getConnection(function(err, connection) {
      if (!err) {
        winston.log('info', 'successful connected to database:\t\t' + process.env.DB_HOST);
      } else {
        winston.log('info', 'Error connecting database');
      }
        connection.release();
    
      });
  }
  return db;
}
