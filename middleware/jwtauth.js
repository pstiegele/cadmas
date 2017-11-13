var UserModel = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.cookies['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, process.env.JWTSECRET);

      if (new Date(decoded.exp) <= Date.now()) {
        res.end('Access token has expired', 400);
      }

      // User.findOne({
      //   _id: decoded.iss
      // }, function(err, user) {
      //   req.user = user;
      // });
      res.locals.user = 'pstiegele';
      next();
    } catch (err) {
      return next();
    }
  } else {
    console.log('not authenticated');
    next();
  }
};
