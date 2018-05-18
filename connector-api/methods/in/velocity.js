const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const velocityToClient = require('../../../client-api/methods/out/velocity');


module.exports = function (ws, payload, callback) {
    var db = global.db;
    var query = "INSERT INTO VelocityTelemetry (activityID,timestamp,groundspeed,airspeed,climbrate,altitude) VALUES (?,?,?,?,?,?);";
    db.query(query, [3, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), payload.groundspeed, payload.airspeed, payload.climbrate,payload.altitude], function (error) {
        if (error) winston.error('error in velocity: ' + error);
        winston.info('velocity successfully inserted');
        ack('velocityACK', 0, ws, callback);
    });
    
    global.client_wss.clients.forEach((value1, value2, set) => {
        winston.info("velocity sent to client");
        velocityToClient(value1, payload, function (ws, method, res) {
            res.time = require('moment')().unix();
            res.id = 0;
            res.method = method;
            value1.send(JSON.stringify(res));
          });
    
      });
}