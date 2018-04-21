const winston = require('../../../middleware/logger');
module.exports = function (ws, callback) {
    var db = global.db;
    var query = "SELECT * FROM Mission";
    db.query(query, function (error, results) {
        if (error) winston.error('error in missions: ' + error);
        var res = [];
        winston.info('build missions');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'missionID': element.id,
                'name': element.name,
                'note': element.note,
                'dt_created': element.dt_created,
                'thumbnailpath': element.thumbnailpath,
                'onConnectionLostMode': element.onConnectionLostMode
            }
            );
        }
        callback(ws, "missions", {'payload': res});
    });







}