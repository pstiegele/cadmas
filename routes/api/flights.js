var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */

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
    console.log('Connected to database');
});

router.get('/', function(req, res, next) {
  var queryResult = 'error';
  connection.query('Select name FROM Flight', function (err, result) {
    if (err) throw err;
      queryResult = result[0].name;
      res.render('index', { title: 'api flights. DB Query: '+queryResult });
  });
});

router.post('/', function(req,res,next){
  res.render('index',{ title: 'api flights post'});
});

module.exports = router;
