const activityReducer = (state = {
  activities: [{
    'activityID': 0,
    'missionID': 2,
    'droneID': 1,
    'name': 'No Websocket Connection!',
    'state': 'completed',
    'note': 'No Websocket Connection established',
    'dt_created': 6381021024,
    'dt_ended': 639191291,
    'duration': 10,
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
