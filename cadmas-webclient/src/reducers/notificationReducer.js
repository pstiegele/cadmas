const notificationReducer = (state = {
    notifications:[{
     'notificationID':1,
     'activityID':1,
     'dt_occured':'123423123',
     'type':'1',
     'title':'My Notification',
     'description': 'My Notification Description'
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
   