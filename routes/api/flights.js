var express = require('express');
var router = express.Router();
var sanitizer = require('sanitizer');
var db = require('../../tools/db')();

router.get('/', function(req, res, next) {
  var queryResult = 'error';
  db.query('Select name FROM Flight', function (err, result) {
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
      db.query(query, name);
      res.render('index',{ title: 'api flights post: inserted successful'});
  }else{
    res.render('index',{ title: 'api flights post: nothing inserted'});
  }
});

module.exports = router;
