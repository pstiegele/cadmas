const winston = require('../../../middleware/logger');
var AWS = require('aws-sdk');
var AdmZip = require('adm-zip');
const uuidv4 = require('uuid/v4');
const ack = require('./ack');
const request = require('request').defaults({ encoding: null });;

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

            request(element.img, { json: true }, (err, res, body) => {
                winston.info("head: "+JSON.stringify(res));
                if (err) {
                    return winston.err("error in fetching camera image for zip: " + err);
                } else {
                    zip.addFile(element.timestamp+".jpg",body);
                }
                if(j>=results.length-1){
                    var s3 = new AWS.S3();
                    var key = uuidv4();
                    s3.putObject({
                      Bucket: process.env.S3_BUCKET,
                      Key: key+'.zip',
                      Body: zip.toBuffer(),
                      ACL: 'public-read'
                    },function (resp) {
                     // console.log(arguments);
                      console.log('Successfully uploaded package.');
                      //send(ws, "cameraImageZip", "https://s3-eu-west-1.amazonaws.com/cadmaszips/"+key+".zip");
                      var ackPayload = {
                        ackToID: msgid,
                        downloadURL: "https://s3-"+process.env.S3_REGION+".amazonaws.com/"+process.env.S3_BUCKET+"/"+key+".zip"
                    };
                      ack('getCameraImagesACK', ackPayload, ws, callback);
                    });
                }
            });
        }
        
        
    });
    
}