const ack = require('../out/ack');
const winston = require('../../../middleware/logger');
const { send } = require('../../main');
const mission = require('../out/mission');

module.exports = function (ws, msg, callback) {
    var db = global.db;
    payload = msg.payload;
    var query = "INSERT INTO Mission (name,note,onConnectionLostMode, userID) VALUES (?,?,?,?);";
    db.query(query, [payload.name, payload.note, payload.onConnectionLostMode, ws.userID], function (error, result) {
        if (error) winston.error('error in addMission: ' + error);
        winston.info('mission successfully inserted');
        //parse route
        var parseString = require('xml2js').parseString;
        parseString(payload.route, function (err, result) {
            winston.error("xml: " + JSON.stringify(result));
        });
        var ackPayload = {
            ackToID: msg.id,
            missionID: result.insertId
        };
        ack('addMissionACK', ackPayload, ws, callback);


        //send new mission to every client
        if (global.client_wss.cadmasClients[ws.userID] !== undefined && global.client_wss.cadmasClients[ws.userID] !== null) {
            global.client_wss.cadmasClients[ws.userID].forEach((value1, value2, set) => {
                winston.info("new mission sent to client");
                mission(value1, result.insertId, false);
            });
        }
    });



}