const winston = require('../../../middleware/logger');
module.exports = function (ws, callback) {
    var db = global.db;
    var query = "SELECT id,username,registrationdate,email,thumbnailpath,firstname,lastname FROM User";
    db.query(query, function (error, results) {
        if (error) winston.error('error in user: ' + error);
        var res;
        winston.info('build user');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res = {
                'userID': element.id,
                'username': element.username,
                'registrationdate': element.registrationdate,
                'email': element.email,
                'thumbnailpath':element.thumbnailpath,
                "firstname":element.firstname,
                "lastname":element.lastname
            };
        }
        callback(ws, "user", {'payload': res});
    });







}