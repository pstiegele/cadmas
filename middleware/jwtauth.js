var UserModel = require('../models/user');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.cookies['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.verify(token, process.env.JWTSECRET, function(err, decoded){
        if(err){
          //console.log('faulty authentication');
          return next();
        }else{
          //console.log('successfully authenticated');
          res.locals.user = 'pstiegele';
          next();
        }
      });

      // if (new Date(decoded.exp) <= Date.now()) {
      //   res.end('Access token has expired', 400);
      // }

      // User.findOne({
      //   _id: decoded.iss
      // }, function(err, user) {
      //   req.user = user;
      // });
    } catch (err) {
      //console.log('faulty authentication');
      return next();
    }
  } else {
    //console.log('not authenticated request');
    next();
  }
};
