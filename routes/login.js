var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var qs = require('querystring');
var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jwt-simple');


router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {

  userAndPasswordisValid(req.body.user, req.body.password, function(authorized) {
    if (authorized) {
      var expires = moment().add(7, 'days').valueOf();
      var token = jwt.encode({
        iss: req.body.user,
        exp: expires
      }, process.env.JWTSECRET);
      res.setHeader('token',token);
      res.setHeader('token_expires',expires);
      //res.setHeader('token_user',req.body.user);
      res.render('login', {
        user: "Welcome, " + req.body.user + "!"
      });
    } else {
      //res.json({token: jwt.sign({ email: "user.email", fullName: "user.fullName", _id: "user._id"}, 'RESTFULAPIs')});
      res.render('login', {
        //user: bcrypt.hashSync('123', 13),
        user: "I can't find your username, " + req.body.user + "!",
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
  } else {
    callback(false);
  }
}

module.exports = router;
