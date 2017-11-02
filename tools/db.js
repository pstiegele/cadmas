var mysql = require('mysql');
var db;
module.exports = function() {
  if (!db) {
      db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DB
    });
    db.connect(function(err) {
      if (!err) {
        console.log('successful connected to database:\t\t'+process.env.DB_HOST);
      } else {
        console.log('Error connecting database');
      }
    });
  }
  return db;
}
