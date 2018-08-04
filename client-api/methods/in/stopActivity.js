const ack = require('../out/ack');
const util = require("util");
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const activity = require('../out/activity');
const disarm = require('../../../connector-api/methods/out/disarm');
const moment = require("moment");


module.exports = function (ws, msg, callback) {
    var payload = msg.payload;
    var db = global.db;
    var query = "UPDATE Activity SET state=2,dt_ended=? WHERE id=?";
    db.query(query, [moment().utc().format('YYYY-MM-DD HH:mm:ss'), payload.activityID], function (error, result) {
        if (error) winston.error('error in stopActivity: ' + error);
        winston.info('stopActivity successfully executed');
        var ackPayload = {
            ackToID: msg.id
        };
        ack('stopActivityACK', ackPayload, ws, callback);

        //transmit updated activity to every client
        if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
            global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
                winston.info("stop activity transmitted to client");
                activity(value1, payload.activityID, send);
            });
        }
    });

    var query = "SELECT droneID FROM Activity WHERE id=?";
    db.query(query, payload.activityID, function (error, result) {
        if (error || result.length !== 1) winston.error('error in stopActivity (in select droneID): ' + error);
        if (global.connector_wss.cadmasConnectors[result[0].droneID] !== undefined && global.connector_wss.cadmasConnectors[result[0].droneID] !== null) {
            disarm(global.connector_wss.cadmasConnectors[result[0].droneID]);
        }

    });

    // query = "SELECT id, UNIX_TIMESTAMP(timestamp) AS timestamp, activityID, img FROM CameraImage"
    // var fs = require('fs');
    // var btoa = require('btoa');
    // db.query(query, function (error, result) {
    //     if (error) winston.error('error in generate Camera Images: ' + error);
    //     for (let i = 0; i < result.length; i++) {
    //         const element = result[i];
    //         if (element.img != null && element.img !== undefined) {

    //             var str = "";
    //             for (let j = 0; j < element.img.length; j++) {
    //                 str = str.concat(String.fromCharCode(element.img[j] & 0xFF));
    //             }
    //             //console.log(str);
    //             str = btoa(str);
    //             fs.writeFile(__dirname + "/../../../../cameraTest/" + element.timestamp + ".data", element.img, function (err) {
    //                 if (err) {
    //                     return console.log(err);
    //                 }

    //                 console.log("The file was saved!");
    //             });

    //         }
    //     }



    // });
}