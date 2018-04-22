const winston = require('../../../middleware/logger');
module.exports = function (ws, callback) {
    var db = global.db;
    var query = "SELECT id,username,fullname,registrationdate,email,avatarpath FROM User";
    db.query(query, function (error, results) {
        if (error) winston.error('error in user: ' + error);
        var res = [];
        winston.info('build user');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'userID': element.id,
                'username': element.username,
                'fullname': element.fullname,
                'registrationdate': element.registrationdate,
                'email': element.email,
                'avatarpath':element.avatarpath
            }
            );
        }
        callback(ws, "user", {'payload': res});
    });







}