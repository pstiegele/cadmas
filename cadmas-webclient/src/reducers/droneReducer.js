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
       
       default:
         break;
     }
     return state;
   };
   
   export default droneReducer;
   