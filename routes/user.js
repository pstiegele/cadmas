var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user', { title: 'User', headline: res.locals.user });
});

module.exports = router;
