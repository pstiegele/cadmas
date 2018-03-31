const moment = require('moment');
module.exports = function(ws, req) {
  var droneID = 1; //TODO: droneID aus Token auslesen
  var query = "SELECT Mission.id,UNIX_TIMESTAMP(Mission.dtCreated) as dtCreated,Mission.name,Mission.note,Mission.onConnectionLostMode FROM Drone LEFT JOIN Mission ON Drone.activeMission=Mission.id JOIN DroneMission ON DroneMission.droneID = Drone.id WHERE Drone.id=?";
  db.query(query, droneID, function(err, results) {
    if (err === null && results.length == 1) {
      var waypointQuery = "SELECT id, latitude, longitude, altitude, type FROM MissionWaypoints WHERE missionID = ?";
      db.query(waypointQuery, results[0].id, function(err, waypointResults) {
        if (err === null) {
          var waypoints = [];
          for (var i = 0; i < waypointResults.length; i++) {
            var waypoint = {
              "waypointID": waypointResults[i].id,
              "latitude": waypointResults[i].latitude,
              "longitude": waypointResults[i].longitude,
              "altitude": waypointResults[i].altitude,
              "type": waypointResults[i].type
            };
            waypoints.push(waypoint);
          }
          res = {
            "time": moment().unix(),
            "method": "newMission",
            "payload": {
              "missionID": results[0].id || 0,
              "dtCreated": results[0].dtCreated || 0,
              "name": results[0].name || "",
              "note": results[0].note || "",
              "onConnectionLostMode": results[0].onConnectionLostMode || "RTL",
              "waypoints": waypoints
            }
          };
          ws.send(JSON.stringify(res));

        } else {
          //TODO
        }
      });
    } else {
      //TODO
    }
  });
}

//   res = {
//     "time": moment().unix(),
//     "method": "newMission",
//     "payload": {
//       "missionID": "12",
//       "dtCreated": moment().unix(),
//       "name": "MyMission",
//       "note": "First test mission",
//       "onConnectionLostMode": "RTL",
//       "waypoints": [
//         {
//           'waypointID': 0,
//           'latitude': 47.163932,
//           'longitude': 008.281267,
//           'altitude': 100,
//           'type': 'TAKEOFF'
//         }, {
//           'waypointID': 1,
//           'latitude': 47.133932,
//           'longitude': 008.251267,
//           'altitude': 200,
//           'type': 'WAYPOINT'
//         }, {
//           'waypointID': 2,
//           'latitude': 47.153932,
//           'longitude': 008.241267,
//           'altitude': 100,
//           'type': 'WAYPOINT'
//         }, {
//           'waypointID': 3,
//           'latitude': 47.135932,
//           'longitude': 008.256267,
//           'altitude': 0,
//           'type': 'LAND'
//         }
//       ]
//     }
//   }
//   ws.send(JSON.stringify(res));
//   console.log("route sent");
// }