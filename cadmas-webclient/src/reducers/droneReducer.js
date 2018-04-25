const droneReducer = (state = {
    drones:[{
     'droneID': 1,
     'name': 'MyDrone',
     'datavolume': '12',
     'note': 'first flight',
     'dt_created': 1543692476,
     'softwareVersion':'13',
     'vehicleType': 'Drone',
     'manufacturer': 'DJI',
     'connectorType': 'ArdupilotConnector',
     'color':'00000',
     'thumbnailpath': 'img/activity0.jpg'
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
   