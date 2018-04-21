const winston = require('../middleware/logger');

module.exports = function (ws, req, callback) {
  winston.error("invalidRequest in auth-api: "+req);
}
