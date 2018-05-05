const notificationReducer = (state = {
    notifications:[{
     'notificationID':1,
     'activityID':1,
     'droneID':1,
     'dt_occured':1503751670,
     'type':'1',
     'title':'No Websocket Connection',
     'description': 'No Websocket Connection'
    }]
   }, action) => {
     switch (action.type) {
       case "SET_NOTIFICATIONS":
         state = {
           ...state,
           notifications: action.payload
         };
         break;
       
       default:
         break;
     }
     return state;
   };
   
   export default notificationReducer;
   