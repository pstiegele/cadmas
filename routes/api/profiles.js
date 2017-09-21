var router = require('express').Router();

router.get('/profiles', function(req,res,next){
  return res.json({profile: 'MyProfile'});
});

module.exports = router;
