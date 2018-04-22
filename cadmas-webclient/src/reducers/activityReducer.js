const activityReducer = (state = {
   activities:[{
    'activityID': 0,
    'missionID': 2,
    'droneID': 1,
    'name': 'MyFlight',
    'state': 'completed',
    'note': 'first flight',
    'dt_created': 6381021024,
    'dt_ended':639191291,
    'duration': 10,
    'thumbnailpath': 'img/activity0.jpg'
   }]
  }, action) => {
    switch (action.type) {
      case "SET_ACTIVITIES":
        state = {
          ...state,
          activities: action.payload
        };
        break;
      
      default:
        break;
    }
    return state;
  };
  
  export default activityReducer;
  