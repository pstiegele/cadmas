const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const cameraImage = require('../../../client-api/methods/out/cameraImage');
const user = require('../../../client-api/methods/out/user');
const Websocket = require('ws');


module.exports = function (ws, msg, callback) {
    var payload = msg.payload;
    if (ws.activeActivity !== undefined && ws.activeActivity !== null) {
    var db = global.db;
    var query = "INSERT INTO CameraImage (activityID,timestamp,img) VALUES (?,?,?);";
    db.query(query, [ws.activeActivity, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), JSON.stringify(payload.img)], function (error) {
        if (error){
            winston.error('error in cameraImage: ' + error);
            return;
        } 
        winston.info('cameraImage successfully inserted');
        ack('cameraImageACK', msg.id, ws, callback);
    });
}

if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
    global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
        winston.info("cameraImage sent to client");
        payload.droneID = ws.droneID;
        cameraImage(value1, payload);
        user(value1);
    });
}

}

