const droneReducer = (state = {
    drones:[{
     'droneID': 1,
     'name': 'No Websocket Connection!',
     'datavolume': '12',
     'note': 'No Websocket Connection established',
     'dt_created': 1543692476,
     'softwareVersion':'13',
     'vehicleType': 'Contact administrator',
     'manufacturer': '',
     'connectorType': '',
     'color':'00000',
     'thumbnailpath': ''
    }]
   }, action) => {
     switch (action.type) {
       case "SET_DRONES":
         state = {
           ...state,
           drones: action.payload
         };
         break;
         case "SET_DRONE":
         state = {
           ...state,
         };
         var successful = false;
         for (var i = 0; i < state.drones.length; i++) {
           if (state.drones[i].droneID === action.payload.droneID) {
             state.drones[i] = action.payload;
             successful = true;
             break;
           }
         }
         if (!successful) {
           state.drones[state.drones.length] = action.payload;
         }
         break;
       
       default:
         break;
     }
     return state;
   };
   
   export default droneReducer;
   