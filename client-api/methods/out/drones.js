const winston = require('../../../middleware/logger');
module.exports = function (ws, callback) {
    var db = global.db;
    var query = "SELECT * FROM Drone";
    db.query(query, function (error, results) {
        if (error) winston.error('error in drones: ' + error);
        var res = [];
        winston.info('build drones');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'droneID': element.id,
                'name': element.name,
                'datavolume': element.datavolume,
                'imagepath': element.imagepath,
                'softwareVersion': element.softwareVersion,
                'note': element.note,
                'dt_created': element.dt_created,
                'vehicleType': element.vehicleType,
                'manufacturer': element.manufacturer,
                'color':element.color,
                'activeMission': element.activeMission
            }
            );
        }
        callback(ws, "drones", {'payload': res});
    });







}