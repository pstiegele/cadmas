const activityReducer = (state = {
  activities: [{
    'activityID': -1,
    'missionID': -1,
    'droneID': -1,
    'name': 'No Websocket Connection!',
    'state': 0,
    'note': 'No Websocket Connection established',
    'dt_created': 0,
    'dt_started': 0,
    'dt_ended': 0,
    'duration': 0,
    'historyTelemetryPositions':[],
    'thumbnailpath': ''
  }]
}, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      state = {
        ...state,
        activities: action.payload
      };
      break;
    case "SET_ACTIVITY":
      state = {
        ...state,
      };
      var successful = false;
      for(var i=0;i<state.activities.length;i++){
        if (state.activities[i].activityID === action.payload.activityID) {
          state.activities[i] = action.payload;
          successful = true;
          break;
        }
      }
      if (!successful){
        state.activities[state.activities.length] = action.payload;
      }
      break;

    default:
      break;
  }
  return state;
};

export default activityReducer;
