import store from "../store";
import { setActivities, setActivity } from "../actions/activityActions";
import { setMissions, setMission } from "../actions/missionActions";
import { setDrones, setDrone } from "../actions/droneActions";
import { setNotifications } from "../actions/notificationActions";
import { setUser } from "actions/userActions";
import { setPayloads } from "actions/payloadActions";
import { setPayloadDevices } from "actions/payloadDeviceActions";
import { setAttitude, setBattery, setHeartbeat, setMissionItem, setMissionState, setPosition, setVelocity, setCameraImage } from "actions/telemetryActions";

var socket;
var msgID = 0;

class CadmasWS {
  callbacks = []
  constructor(props) {
    this.initWS();
  }
  initAuthAPI() {
    var that = this;
    console.log("authenticate first! ");
    var authSocket;
    if (window.location.hostname !== "localhost" && !window.location.hostname.startsWith("192")) {
      authSocket = new WebSocket("wss://" + window.location.hostname + ":8081/auth");
    } else {
      authSocket = new WebSocket("ws://" + window.location.hostname + "/auth");
    }

    authSocket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      switch (msg.method) {
        case "authentication":
          if (msg.payload.successful) {
            localStorage.setItem('token', msg.payload.token);
            console.log("authenticated successfully");
            that.initClientAPI(msg.payload.token);
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
      console.log("authenticate transmitted");

    };
  }
  initClientAPI(token) {
    var that = this;
    var hostname = window.location.hostname;
    if (window.location.hostname !== "localhost" && !window.location.hostname.startsWith("192")) {
      socket = new WebSocket("wss://" + hostname + ":8081/client?token=" + token, token);
    } else {
      socket = new WebSocket("ws://" + hostname + "/client?token=" + token, token);
    }

    socket.onclose = function (event) {
      setTimeout(function(){that.initClientAPI(token)}, 5000);
    }


    socket.onmessage = function (event) {
      var msg;
      try {
        msg = JSON.parse(event.data);
      } catch (error) {
        console.log("parsing error! msg: " + event.data);
        console.log("parsing error! error: " + error);
      }
      //console.log("msg: " + JSON.stringify(msg));
      if (msg !== undefined && msg.hasOwnProperty("method")) {
        switch (msg.method) {
          case "addMissionACK":
            that.handleCallback(msg.payload);
            break;
          case "addActivityACK":
            that.handleCallback(msg.payload);
            break;

          case "activities":
            store.dispatch(setActivities(msg.payload));
            break;
          case "activity":
            store.dispatch(setActivity(msg.payload));
            break;
          case "missions":
            store.dispatch(setMissions(msg.payload));
            break;
          case "mission":
            store.dispatch(setMission(msg.payload));
            break;
          case "drones":
            store.dispatch(setDrones(msg.payload));
            break;
          case "drone":
            store.dispatch(setDrone(msg.payload));
            break;
          case "notifications":
            store.dispatch(setNotifications(msg.payload));
            break;
          case "user":
            store.dispatch(setUser(msg.payload));
            break;
          case "payloads":
            store.dispatch(setPayloads(msg.payload));
            break;
          case "payloadDevices":
            store.dispatch(setPayloadDevices(msg.payload));
            break;
          case "attitude":
            store.dispatch(setAttitude(msg.payload));
            break;
          case "battery":
            store.dispatch(setBattery(msg.payload));
            break;
          case "heartbeat":
            store.dispatch(setHeartbeat(msg.payload));
            break;
          case "missionItem":
            store.dispatch(setMissionItem(msg.payload));
            break;
          case "missionState":
            store.dispatch(setMissionState(msg.payload));
            break;
          case "position":
            store.dispatch(setPosition(msg.payload));
            break;
          case "velocity":
            store.dispatch(setVelocity(msg.payload));
            break;
          case "cameraImage":
            // var testimg = [-1,-40,-1,-32,0,16,74,70,73,70,0];
            // var str = "";
            // for (let i = 0; i <testimg.length; i++) {
            //   str+=String.fromCharCode(testimg[i]& 0xFF);
            // }
            // console.log(JSON.stringify(btoa(str)));
            store.dispatch(setCameraImage(msg.payload));
            break;
          default:
            break;
        }
        console.log("ws received: " + msg.method);
      }

    }
    socket.onopen = function (event) {
      //console.log("onOpen called: " + JSON.stringify(this));
      //   for (var i = 0; i < 350; i++) {
      //     var activityID = Math.floor(Math.random() * (296 - 1 + 1) + 1);
      //     while (activityID < 119 && activityID > 17) {
      //       activityID = Math.floor(Math.random() * (296 - 1 + 1) + 1);
      //     }
      //     var payloadDevice = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      //     var size = Math.floor(Math.random() * (1073741824 - 1 + 1) + 1);


      //     var msg = {
      //       method: "addPayloadData",
      //       payload: {
      //         activityID: activityID,
      //         payloadDeviceID: payloadDevice,
      //         type: "0",
      //         filepath: "",
      //         size: size
      //       }
      //     };
      //     socket.send(JSON.stringify(msg));
      //     console.log("addPayloadData transmitted");

      //   }
    };


  }

  initWS() {
    var token = localStorage.getItem("token");
    if (!token) {
      this.initAuthAPI();
    } else {
      this.initClientAPI(token);
    }
  }
  getMsgID() {
    if (msgID > Number.MAX_SAFE_INTEGER) {
      msgID = 0;
    }
    return msgID++;
  }

  handleCallback(payload) {
    console.log("handleCallback called");
    if (typeof this.callbacks[payload.ackToID] === "function")
      this.callbacks[payload.ackToID](payload);
  }


  addMission(name, note, route, callback) {
    var payload = {
      "name": name,
      "note": note,
      "route": route
    };
    this.packAndSend("addMission", payload, callback);
    console.log("addMission (" + name + ") transmitted");
  }
  addActivity(missionID, droneID, name, state, note, callback) {
    var payload = {
      missionID: missionID,
      droneID: droneID,
      name: name,
      state: state,
      note: note
    };
    this.packAndSend("addActivity", payload, callback);
    console.log("addActivity (" + name + ") transmitted");
  }
  getFullMission(missionID, callback) {
    var payload = {
      missionID: missionID
    };
    this.packAndSend("getFullMission", payload, callback);
    console.log("getFullMission (" + missionID + ") transmitted");
  }

  startActivity(activityID, callback) {
    var payload = {
      activityID: activityID
    };
    this.packAndSend("startActivity", payload, callback);
    console.log("startActivity (" + activityID + ") transmitted");
  }
  stopActivity(activityID, callback) {
    var payload = {
      activityID: activityID
    };
    this.packAndSend("stopActivity", payload, callback);
    console.log("stopActivity (" + activityID + ") transmitted");
  }

  setMode(mode, droneID, callback) {
    var payload = {
      mode: mode,
      droneID: droneID
    };
    this.packAndSend("setMode", payload, callback);
    console.log("setMode (" + mode + ") transmitted");
  }

  packAndSend(method, payload, callback) {
    var msg = {
      time: new Date(),
      id: this.getMsgID(),
      method: method,
      payload: payload
    }
    var callbacks = this.callbacks;
    this.waitForSocketConnection(socket, function () {
      socket.send(JSON.stringify(msg));
      callbacks[msg.id] = callback;
    });
  }

  waitForSocketConnection(socket, callback) {
    var that = this;
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          if (callback != null) {
            callback();
          }
          return;

        } else {
          that.waitForSocketConnection(socket, callback);
        }

      }, 50); // wait 50 milisecond for the connection...
  }
  addPayloadData(activityID, payloadDeviceID, type, filepath, size) {
    var msg = {
      method: "addPayloadData",
      payload: {
        activityID: activityID,
        payloadDeviceID: payloadDeviceID,
        type: type,
        filepath: filepath,
        size: size
      }
    };
    socket.send(JSON.stringify(msg));
    console.log("addPayloadData transmitted");
  }
}
const instance = new CadmasWS();
Object.freeze(instance);

export default instance;
