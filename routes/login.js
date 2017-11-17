var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var qs = require('querystring');
var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jsonwebtoken');


router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {

  userAndPasswordisValid(req.body.user, req.body.password, function(authorized) {
    if (authorized) {
      var expires = moment().add(30, 'days').valueOf();
      var token = jwt.sign({
        iss: req.body.user,
        exp: expires
      }, process.env.JWTSECRET);
      res.setHeader('Set-Cookie','x-access-token='+token+'; Expires = '+new Date(expires).toUTCString()+'; Secure');
      console.log('expires: '+new Date(expires).toUTCString());
      //res.setHeader('token_user',req.body.user);
      res.render('login', {
        welcome_message: "Welcome, " + req.body.user + "!"
      });
    } else {
      //res.json({token: jwt.sign({ email: "user.email", fullName: "user.fullName", _id: "user._id"}, 'RESTFULAPIs')});
      res.render('login', {
        //user: bcrypt.hashSync('123', 13),
        welcome_message: "I can't find you, " + req.body.user + "!",
        //password: "Your password " + req.body.password + " is wrong."
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
