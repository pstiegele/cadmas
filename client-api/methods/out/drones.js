const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT * FROM Drone";
    db.query(query, function (error, results) {
        if (error||results===undefined) winston.error('error in drones: ' + error);
        var res = [];
        winston.info('build drones');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'droneID': element.id,
                'name': element.name,
                'datavolume': element.datavolume,
                'thumbnailpath': element.thumbnailpath,
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
        send(ws, "drones", res);
    });







}