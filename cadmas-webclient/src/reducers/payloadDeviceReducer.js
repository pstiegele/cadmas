const payloadDeviceReducer = (state = {
   payloadDevices:[{
    'payloadDeviceID': 0,
    'name': "No Websocket Connection!",
    'typeName': ""
   }]
  }, action) => {
    switch (action.type) {
      case "SET_PAYLOADDEVICES":
        state = {
          ...state,
          payloadDevices: action.payload
        };
        break;
      
      default:
        break;
    }
    return state;
  };
  
  export default payloadDeviceReducer;
  