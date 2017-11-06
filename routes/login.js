var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var qs = require('querystring');
var bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {

  userAndPasswordisValid(req.body.user, req.body.password, function(authorized) {
    if (authorized) {
      res.render('login', {
        user: "Welcome, " + req.body.user + "!",
        password: "Your password is: " + req.body.password
      });
    } else {
      res.render('login', {
        //user: bcrypt.hashSync('123', 15),
        user: "I can't find your username, "+req.body.user+"!",
        password: "Your password " + req.body.password + " is wrong."
      });
    }

  });


});


function userAndPasswordisValid(user, password, callback) {
  var db = require('../tools/db')();
  if (user && password) {
    var query = "SELECT * FROM User WHERE username=?";
    db.query(query, user, function(err, results) {
      if (err === null && results.length == 1) {
        var pa = password;
        var respas = results[0].password;
        bcrypt.compare(password, results[0].password, function(err, res) {
          if (res) {
            callback(true);
          } else {
            callback(false);
          }
        });

      } else {
        callback(false);
      }
    });
  }else{
    callback(false);
  }
}

module.exports = router;
