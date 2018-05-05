const ack = require('../out/ack');
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
  var db = global.db;
 var query = "INSERT INTO PayloadData (activityID,payloadDeviceID,type,filepath,size) VALUES (?,?,?,?,?);"; 
 db.query(query,[payload.activityID,payload.payloadDeviceID,payload.type,payload.filepath,payload.size], function(error){
     if(error) winston.error('error in addPayloadData: '+error);;
     winston.info('payloadData successfully inserted');
     ack('addPayloadDataACK',0,ws,callback);
 });

}