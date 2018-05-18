const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const positionToClient = require('../../../client-api/methods/out/position');


module.exports = function (ws, payload, callback) {
    var db = global.db;
    var position = "POINT("+payload.latitude+" "+payload.longitude+")";
    winston.info("position: "+position);
    var query = "INSERT INTO PositionTelemetry (activityID,timestamp,position, altitude) VALUES (?,?,ST_GeomFromText(?),?);";
    db.query(query, [3, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), position,payload.altitude], function (error) {
        if (error) winston.error('error in position: ' + error);
        winston.info('position successfully inserted');
        ack('positionACK', 0, ws, callback);
    });
    
    global.client_wss.clients.forEach((value1, value2, set) => {
        winston.info("position sent to client");
        positionToClient(value1, payload, function (ws, method, res) {
            res.time = require('moment')().unix();
            res.id = 0;
            res.method = method;
            value1.send(JSON.stringify(res));
          });
    
      });
}