var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sanitizer = require('sanitizer');

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
      queryResult = result[result.length-1].name;
      res.render('index', { title: 'Flights', headline: 'Last Flight: '+queryResult });
  });
});

router.post('/', function(req,res,next){
  var name=sanitizer.sanitize(req.query.name);
  if(name != ""){
      var query = 'INSERT INTO Flight (missionID, droneID, name, state) VALUES (\'1\',\'1\',?,\'1\')';
      console.log(query);
      connection.query(query, name);
      res.render('index',{ title: 'api flights post: inserted successful'});
  }else{
    res.render('index',{ title: 'api flights post: nothing inserted'});
  }
});

module.exports = router;
