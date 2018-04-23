const missionReducer = (state = {
    missions:[{
     'missionID': 2,
     'name': 'MyMission',
     'note': 'first flight',
     'dt_created': 1503751670,
     'thumbnailpath': 'img/activity0.jpg',
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
   