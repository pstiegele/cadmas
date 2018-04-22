import store from "../store";
import { setActivities } from "../actions/activityActions";
import { setMissions } from "../actions/missionActions";
import { setDrones } from "../actions/droneActions";
import { setNotifications } from "../actions/notificationActions";
import { setUser } from "actions/userActions";

var socket;


class CadmasWS {

  constructor(props) {
    this.initWS();
  }
  initWS() {
    var token = localStorage.getItem("token");
    if (!token) {
      console.log("authenticate first! " + window.location.hostname);
      var authSocket = new WebSocket("ws://" + window.location.hostname + "/auth");
      authSocket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        switch (msg.method) {
          case "authentication":
            if (msg.payload.successful) {
              localStorage.setItem('token', msg.payload.token);
              console.log("authenticated successfully");

            } else {
              console.log("authentication failed");
            }
            break;
          default:
            break;
        }

        console.log("auth-ws received: " + msg.method);
      }
      authSocket.onopen = function (event) {
        var msg = {
          "method": "authenticate",
          "payload": {
            "username": "ps",
            "password": "123"
          }
        };
        authSocket.send(JSON.stringify(msg));
        console.log("authenticate sent");

      };
    }
    if (token) {
      var hostname = window.location.hostname;
      //var hostname = "cadmasapp.raapvdzcqu.eu-west-1.elasticbeanstalk.com";
      socket = new WebSocket("ws://" + hostname + "/client?token=" + token, token);
      socket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        switch (msg.method) {
          case "addMissionACK":
            break;

          case "activities":
            store.dispatch(setActivities(msg.payload));
            break;
          case "missions":
            store.dispatch(setMissions(msg.payload));
            break;
          case "drones":
            store.dispatch(setDrones(msg.payload));
            break;
          case "notifications":
            store.dispatch(setNotifications(msg.payload));
            break;
          case "user":
            store.dispatch(setUser(msg.payload));
            break;

          default:
            break;
        }

        console.log("ws received: " + msg.method);
      }
      socket.onopen = function (event) {


      };

    }
  }
  addMission(name, note, onConnectionLostMode) {
    var msg = {
      "method": "addMission",
      "payload": {
        "name": name,
        "note": note,
        "onConnectionLostMode": onConnectionLostMode
      }
    };
    socket.send(JSON.stringify(msg));
    console.log("addMission (" + name + ") sent");
  }
}
export default CadmasWS;
