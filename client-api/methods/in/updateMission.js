const ack = require('../out/ack');
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
  var db = global.db;
 var query = "UPDATE Mission SET "; 
 db.query(query,[payload.name,payload.note,payload.onConnectionLostMode], function(error){
     if(error) winston.error('error in addMission: '+error);;
     winston.info('mission successfully inserted');
     ack('addMissionACK',0,ws,callback);
 });

}