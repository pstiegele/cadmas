var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CADMAS', headline: 'Cloudbased Drone Management Suite' });
});

module.exports = router;
