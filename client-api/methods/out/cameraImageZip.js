const winston = require('../../../middleware/logger');
const send = require("../../main").send;
var btoa = require('btoa');
var fs = require('fs');
var AWS = require('aws-sdk');
var AdmZip = require('adm-zip');
const uuidv4 = require('uuid/v4');
const ack = require('./ack');

module.exports = function (ws, msgid, activityID, callback) {
    var query = "SELECT UNIX_TIMESTAMP(timestamp) AS timestamp,img FROM CameraImage WHERE activityID=? ORDER BY timestamp";
    db.query(query, activityID, function (error, results) {
        if (error || results === undefined) {
            winston.error('error in cameraImageZip: ' + error);
            return;
        }
        var zip = new AdmZip();
        AWS.config.region = process.env.S3_REGION; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.S3_IDENTITY_POOL_ID,
        });
        for (let j = 0; j < results.length; j++) {
            const element = results[j];
            var str = "";
            element.img = JSON.parse(element.img);
            //console.log(element.img[0]+element.img[1]+element.img[2]+element.img[3]+element.img[4]+element.img[5]);
            for (let i = 0; i < element.img.length; i++) {
                str = str.concat(String.fromCharCode(element.img[i] & 0xFF));
            }
            //console.log(str[0]+str[1]+str[2]+str[3]+str[4]+str[5]+str[6]);
            str = btoa(str);
            str = Buffer.from(str, 'base64');
            zip.addFile(element.timestamp+".jpg", str);
            // fs.writeFile(__dirname + "/cameratest/" + element.timestamp + ".jpg", Buffer.from(str, 'base64'), function (err) {
            //     if (err) {
            //         return console.log(err);
            //     }

            //     console.log("The file was saved!");
            // });
        }
        
        var s3 = new AWS.S3();
        var key = uuidv4();
        s3.putObject({
          Bucket: process.env.S3_BUCKET,
          Key: key+'.zip',
          Body: zip.toBuffer(),
          ACL: 'public-read'
        },function (resp) {
          console.log(arguments);
          console.log('Successfully uploaded package.');
          //send(ws, "cameraImageZip", "https://s3-eu-west-1.amazonaws.com/cadmaszips/"+key+".zip");
          var ackPayload = {
            ackToID: msgid,
            downloadURL: "https://s3-"+process.env.S3_REGION+".amazonaws.com/"+process.env.S3_BUCKET+"/"+key+".zip"
        };
          ack('getCameraImagesACK', ackPayload, ws, callback);
        });
    });
    
}