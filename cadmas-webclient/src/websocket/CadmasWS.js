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
  initAuthAPI(){
    console.log("authenticate first! ");
    var authSocket;
    if(window.location.hostname!=="localhost"){
      authSocket = new WebSocket("wss://" + window.location.hostname + ":8081/auth");
    }else{
      authSocket = new WebSocket("ws://" + window.location.hostname + "/auth");
    }
    authSocket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      switch (msg.method) {
        case "authentication":
          if (msg.payload.successful) {
            localStorage.setItem('token', msg.payload.token);
            console.log("authenticated successfully");
            this.initClientAPI(msg.payload.token);
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
  initClientAPI(token){

    var hostname = window.location.hostname;
    if(window.location.hostname!=="localhost"){
      socket = new WebSocket("wss://" + hostname + ":8081/client?token=" + token, token);
    }else{
      socket = new WebSocket("ws://" + hostname + "/client?token=" + token, token);
    }
    
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

  initWS() {
    var token = localStorage.getItem("token");
    if (!token) {
      this.initAuthAPI();
    }else{
      this.initClientAPI(token);
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
  addActivity(missionID, droneID, name, state, note, dt_created, dt_ended) {
    var msg = {
      method: "addActivity",
      payload: {
        missionID: missionID,
        droneID: droneID,
        name: name,
        state: state,
        note: note,
        dt_created: dt_created,
        dt_ended
      }
    };
    socket.send(JSON.stringify(msg));
    console.log("addActivity (" + name + ") sent");
  }
}
export default CadmasWS;
