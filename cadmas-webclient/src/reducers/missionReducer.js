const missionReducer = (state = {
    missions:[{
     'missionID': 0,
     'name': 'No Websocket Connection',
     'note': 'No Websocket Connection established',
     'dt_created': 1503751670,
     'thumbnailpath': '',
     'onConnectionLostMode':'RTL'
    }]
   }, action) => {
     switch (action.type) {
       case "SET_MISSIONS":
         state = {
           ...state,
           missions: action.payload
         };
         break;
       
       default:
         break;
     }
     return state;
   };
   
   export default missionReducer;
   