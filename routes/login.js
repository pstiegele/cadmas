var express = require('express');
var router = express.Router();
var qs = require('querystring');


router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {

  res.render('login', {
    user: "Welcome, "+req.body.user+"!",
    password: "Your password is: "+ req.body.password
  });


});

module.exports = router;
