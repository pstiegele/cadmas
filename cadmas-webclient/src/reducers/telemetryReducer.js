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
    'route': []
  }
}, action) => {
  switch (action.type) {
    case "SET_ATTITUDE":
      var droneID = action.payload.droneID;
      state = {
        ...state
      };
      if (state[action.payload.droneID] === undefined || state[action.payload.droneID] === null)
        state[action.payload.droneID] = {};
      state[action.payload.droneID].attitude = action.payload;
      delete state[action.payload.droneID].attitude.droneID;
      break;

    case "SET_BATTERY":
      var droneID = action.payload.droneID;
      state = {
        ...state
      };
      if (state[action.payload.droneID] === undefined || state[action.payload.droneID] === null)
        state[action.payload.droneID] = {};
      state[action.payload.droneID].battery = action.payload;
      delete state[action.payload.droneID].battery.droneID;
      break;

    case "SET_HEARTBEAT":
      var droneID = action.payload.droneID;
      state = {
        ...state
      };
      if (state[action.payload.droneID] === undefined || state[action.payload.droneID] === null)
        state[action.payload.droneID] = {};
      state[action.payload.droneID].heartbeat = action.payload;
      delete state[action.payload.droneID].heartbeat.droneID;
      break;

    case "SET_MISSIONITEM":
      var droneID = action.payload.droneID;
      state = {
        ...state
      };
      if (state[action.payload.droneID] === undefined || state[action.payload.droneID] === null)
        state[action.payload.droneID] = {};
      state[action.payload.droneID].missionItem = action.payload;
      delete state[action.payload.droneID].missionItem.droneID;
      break;

    case "SET_MISSIONSTATE":
      var droneID = action.payload.droneID;
      state = {
        ...state
      };
      if (state[action.payload.droneID] === undefined || state[action.payload.droneID] === null)
        state[action.payload.droneID] = {};
      state[action.payload.droneID].missionState = action.payload;
      delete state[action.payload.droneID].missionState.droneID;
      break;

    case "SET_POSITION":
      var droneID = action.payload.droneID;
      state = {
        ...state
      };
      if (state[action.payload.droneID] === undefined || state[action.payload.droneID] === null)
        state[action.payload.droneID] = {};
      state[action.payload.droneID].position = action.payload;
      if (state[action.payload.droneID].route === undefined || state[action.payload.droneID].route === null)
        state[action.payload.droneID].route = [];
      state[action.payload.droneID].route.push({
        lat: action.payload.latitude,
        lng: action.payload.longitude
      }
      );
      delete state[action.payload.droneID].position.droneID;
      break;

    case "SET_VELOCITY":
      var droneID = action.payload.droneID;
      state = {
        ...state
      };
      if (state[action.payload.droneID] === undefined || state[action.payload.droneID] === null)
        state[action.payload.droneID] = {};
      state[action.payload.droneID].velocity = action.payload;
      delete state[action.payload.droneID].velocity.droneID;
      break;

    default:
      break;
  }
  return state;
};

export default telemetryReducer;
