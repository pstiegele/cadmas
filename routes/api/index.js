var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));


router.use(function(err,req,res,next){
  return next(err);
});

module.exports = router;
