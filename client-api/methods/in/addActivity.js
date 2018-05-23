const ack = require('../out/ack');
const util = require("util");
const winston = require('../../../middleware/logger');

module.exports = function (ws, payload, callback) {
  var db = global.db;
 var query = "INSERT INTO Activity (missionID,droneID,name,state,note) VALUES (?,?,?,?,?);"; 
 db.query(query,[payload.missionID,payload.droneID,payload.name,payload.state,payload.note], function(error){
     if(error) winston.error('error in addActivity: '+error);;
     winston.info('activity successfully inserted');
     ack('addActivityACK',0,ws,callback);
 });

 global.connector_wss.clients.forEach((value1, value2, set) => {
    value1.send("hey!!!!!");
  });
}