const payloadReducer = (state = {
   payloads:[{
    'payloadID': 0,
    'activityID': 0,
    'payloadDeviceID': 0,
    'type': '',
    'filepath': '',
    'size': '72489291'
   }]
  }, action) => {
    switch (action.type) {
      case "SET_PAYLOADS":
        state = {
          ...state,
          payloads: action.payload
        };
        break;
      
      default:
        break;
    }
    return state;
  };
  
  export default payloadReducer;
  