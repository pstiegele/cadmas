const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const moment = require("moment");
const cameraImage = require('../../../client-api/methods/out/cameraImage');
const user = require('../../../client-api/methods/out/user');
const Websocket = require('ws');
var btoa = require('btoa');
var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');


module.exports = function (ws, msg, callback) {
    var payload = msg.payload;
    if (ws.activeActivity !== undefined && ws.activeActivity !== null) {
        AWS.config.region = process.env.S3_REGION; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.S3_IDENTITY_POOL_ID,
        });
        var db = global.db;
        var str = "";
        for (let i = 0; i < payload.img.length; i++) {
            str = str.concat(String.fromCharCode(payload.img[i] & 0xFF));
        }
        str = btoa(str);
        str = Buffer.from(str, 'base64');

        var s3 = new AWS.S3();
        var key = uuidv4();
        s3.putObject({
            Bucket: process.env.S3_BUCKET,
            Key: key + '.jpg',
            Body: str,
            ACL: 'public-read'
        }, function (resp) {
            var query = "INSERT INTO CameraImage (activityID,timestamp,img) VALUES (?,?,?);";
            db.query(query, [ws.activeActivity, moment(payload.timestamp).format('YYYY-MM-DD HH:mm:ss'), "https://s3-" + process.env.S3_REGION + ".amazonaws.com/" + process.env.S3_BUCKET + "/" + key + ".jpg"], function (error) {
                if (error) {
                    winston.error('error in cameraImage: ' + error);
                    return;
                }
                winston.info('cameraImage successfully inserted');
                ack('cameraImageACK', msg.id, ws, callback);
            });
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

