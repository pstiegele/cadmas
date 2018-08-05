const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws, droneID) {
    var db = global.db;
    var query = "SELECT * FROM Drone WHERE userID=? AND id=?";
    db.query(query, [ws.userID, droneID], function (error, results) {
        if (error || results === undefined || results.length !== 1) {
            winston.error('error in drone: ' + error);
            return;
        }
        winston.info('build drone');
        const element = results[0];
        var res = {
            'droneID': element.id,
            'name': element.name,
            'datavolume': element.datavolume,
            'thumbnailpath': element.thumbnailpath,
            'softwareVersion': element.softwareVersion,
            'note': element.note,
            'dt_created': element.dt_created,
            'connectorType': element.connectorType,
            'vehicleType': element.vehicleType,
            'manufacturer': element.manufacturer,
            'color': element.color,
            'activeMission': element.activeMission,
            'connected': global.connector_wss.cadmasConnectors[element.id] !== undefined ? true : false
        }
        send(ws, "drone", res);
    });

}