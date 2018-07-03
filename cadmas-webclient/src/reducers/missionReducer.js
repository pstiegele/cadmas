const missionReducer = (state = {
  missions: [{
    'missionID': 0,
    'name': 'No Websocket Connection',
    'note': 'No Websocket Connection established',
    'dt_created': 1503751670,
    'thumbnailpath': '',
    'onConnectionLostMode': 'RTL',
    'waypoints': [{
      'missionIndex': 0,
      'type': 'START',
      'altitude': 0,
      'lat': 0,
      'lng': 0
    }]
  }]
}, action) => {
  switch (action.type) {
    case "SET_MISSIONS":
      state = {
        ...state,
        missions: action.payload
      };
      break;
    case "SET_MISSION":
      state = {
        ...state,
      };
      var successful = false;
      for (var i = 0; i < state.missions.length; i++) {
        if (state.missions[i].missionID === action.payload.missionID) {
          state.missions[i] = action.payload;
          successful = true;
          break;
        }
      }
      if (!successful) {
        state.missions[state.missions.length] = action.payload;
      }
      break;

    default:
      break;
  }
  return state;
};

export default missionReducer;
