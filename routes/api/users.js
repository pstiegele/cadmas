var router = require('express').Router();

router.get('/user', function(req,res,next){
  return res.json({user: 'MyUser'});
});

module.exports = router;
