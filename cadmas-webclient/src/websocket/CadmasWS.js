import {setName} from "actions/userActions";
import store from "../store";
import { setActivities } from "../actions/activityActions";

var socket;


class CadmasWS{
 
    constructor(props){
        this.initWS();
    }
    initWS(){
        var token = localStorage.getItem("token");
        if(!token){
          console.log("authenticate first! "+window.location.hostname);
          var authSocket = new WebSocket("ws://"+window.location.hostname+"/auth");
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
    
          socket = new WebSocket("ws://"+window.location.hostname+"/client?token="+token, token);
          socket.onmessage = function (event) {
            var msg = JSON.parse(event.data);
            switch (msg.method) {
              case "addMissionACK":
                break;
    
              case "activities":
              store.dispatch(setActivities(msg.payload));
                break;
              case "missions":
                break;
              case "drones":
                break;
              case "notifications":
                break;
              case "user":
              store.dispatch(setName(msg.payload.username));
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
    addMission(name, note, onConnectionLostMode){
      var msg = {
        "method": "addMission",
        "payload": {
          "name": name,
          "note": note,
          "onConnectionLostMode": onConnectionLostMode
        }
      };
      socket.send(JSON.stringify(msg));
      console.log("addMission ("+name+") sent");
    }
  }
  export default CadmasWS;
