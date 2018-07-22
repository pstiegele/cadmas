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
      'messagesLost': 0
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
    'cameraImage':{
      'timestamp':0,
      'img':0
    },
    'route': []
  }
}, action) => {
  var droneID;
  if(action.payload!==undefined)
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
