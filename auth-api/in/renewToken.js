const checkAuthentication = require('../../middleware/checkAuthentication').checkAuthentication;
const authentication = require('../out/authentication');
const jwt = require('jsonwebtoken');

module.exports = function (ws, payload, callback) {
    var decodedToken = jwt.decode(payload.token);
    authentication(checkAuthentication(payload.token,false),decodedToken.sub,decodedToken.userID,ws,callback);
}
