const telemetryReducer = (state = {
  0: {
    'attitude': {
      'timestamp': 0,
      'roll': 0,
      'pitch': 0,
      'heading': 0
    },
    'battery': {
      'timestamp': 0,
      'voltage': 0,
      'current': 0,
      'percentage': 0
    },
    'heartbeat': {
      'timestamp': 0,
      'baseMode': 0,
      'customMode': 0,
      'messagesLost': 0,
      'cpuTemp':0
    },
    'missionItem': {
      'timestamp': 0,
      'command': 0,
      'result': 0,
      'item': 0
    },
    'missionState': {
      'timestamp': 0,
      'currentSequence': 0
    },
    'position': {
      'timestamp': 0,
      'latitude': 0,
      'longitude': 0,
      'altitude': 0,
      'altitudeAbsolute': 0,
      'altitudeRelative': 0
    },
    'velocity': {
      'timestamp': 0,
      'groundspeed': 0,
      'airspeed': 0,
      'climbrate': 0
    },
    'cameraImage': {
      'timestamp': 0,
      'img': "/9j/4QlQaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/bAIQADwoKCgsKDwsLDxYODA4WGhMPDxMaHRcXFxcXHR0WGRgYGRYdHSIjJSMiHS0tMTEtLUBAQEBAQEBAQEBAQEBAQAEQDg4QEhAUEREUFBATEBQYFBUVFBgkGBgaGBgkLiEdHR0dIS4pLCUlJSwpMjIuLjIyPz88Pz9AQEBAQEBAQEBA/90ABAAT/+4ADkFkb2JlAGTAAAAAAf/AABEIAMgBLAMAIgABEQECEQH/xACSAAACAgMBAAAAAAAAAAAAAAAAAQMGAgQFBwEBAQEBAAAAAAAAAAAAAAAAAAECAxAAAQMDAwIEAgYHBgQHAAAAAQACAwQFEQYSIRMxFCJBUQcyQmFxgZGh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"
    },
    'route': []
  }
}, action) => {
  var droneID;
  if (action.payload !== undefined)
    droneID = action.payload.droneID;
  switch (action.type) {
    case "SET_ATTITUDE":

      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].attitude = action.payload;
      delete state[droneID].attitude.droneID;
      break;

    case "SET_BATTERY":

      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].battery = action.payload;
      delete state[droneID].battery.droneID;
      break;

    case "SET_HEARTBEAT":

      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].heartbeat = action.payload;
      delete state[droneID].heartbeat.droneID;
      break;

    case "SET_CAMERAIMAGE":
      var str = "";
      //console.log(action.payload.img[0]+action.payload.img[1]+action.payload.img[2]+action.payload.img[3]+action.payload.img[4]+action.payload.img[5]);
      for (let i = 0; i < action.payload.img.length; i++) {
        str = str.concat(String.fromCharCode(action.payload.img[i] & 0xFF));
      }
      //console.log("str: "+str);
      str = btoa(str);
      action.payload.img=str;
      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].cameraImage = action.payload;
      delete state[droneID].cameraImage.droneID;
      break;

    case "SET_MISSIONITEM":

      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].missionItem = action.payload;
      delete state[droneID].missionItem.droneID;
      break;

    case "SET_MISSIONSTATE":

      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].missionState = action.payload;
      delete state[droneID].missionState.droneID;
      break;

    case "SET_POSITION":

      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].position = action.payload;
      if (state[droneID].route === undefined || state[droneID].route === null)
        state[droneID].route = [];
      state[droneID].route.push({
        lat: action.payload.latitude,
        lng: action.payload.longitude
      }
      );
      delete state[droneID].position.droneID;
      break;

    case "SET_VELOCITY":

      state = {
        ...state
      };
      if (state[droneID] === undefined || state[droneID] === null)
        state[droneID] = {};
      state[droneID].velocity = action.payload;
      delete state[droneID].velocity.droneID;
      break;

    default:
      break;
  }
  return state;
};

export default telemetryReducer;
