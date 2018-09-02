const winston = require('../../../middleware/logger');
const send = require("../../main").send;

module.exports = function (ws) {
    var db = global.db;
    var query = "SELECT id,name,note,UNIX_TIMESTAMP(dtCreated) AS dtCreated,thumbnailpath,distance,route,location FROM Mission WHERE userID=?";
    db.query(query, ws.userID, function (error, results) {
        if (error||results===undefined){
            winston.error('error in missions: ' + error);
            return;
        } 
        var res = [];
        winston.info('build missions');
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            res.push({
                'missionID': element.id,
                'name': element.name,
                'note': element.note,
                'dt_created': element.dtCreated,
                'thumbnailpath': element.thumbnailpath,
                'distance':element.distance,
                'route':element.route,
                'location':element.location
            }
            );
            // //Anfang send full missions test
            // res[index].waypoints = [];
            // var waypointquery = "SELECT missionIndex, altitude, location, type FROM MissionWaypoints WHERE missionID = ? ORDER BY missionIndex";
            // db.query(waypointquery, element.id, function (error, results) {
            //     if (error || results === undefined) winston.error('error in missions (get waypoints): ' + error);
            //    // winston.info('build waypoints to missions');
            //     results.forEach(element => {
            //         element.lat = element.location.x;
            //         element.lng = element.location.y;
            //         delete element.location;
            //         res[index].waypoints.push(element);
            //     });
            // });
            // //Ende send full missions test
        }
        send(ws, "missions", res);
    });







}