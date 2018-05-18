const telemetryReducer = (state = {
    telemetry:{
     'attitude':{
         'timestamp': 0,
        'roll':0,
        'pitch': 0,
        'heading': 0
    },
     'battery':{
         'timestamp': 0,
         'voltage': 0,
         'current': 0,
         'percentage': 0
     },
     'heartbeat':{
         'timestamp':0,
         'baseMode':0,
         'customMode':0,
         'messagesLost':0
     },
     'missionItem':{
         'timestamp':0,
         'command':0,
         'result':0,
         'item':0
     },
     'missionState':{
         'timestamp':0,
         'currentSequence':0
     },
     'position':{
         'timestamp': 0,
         'latitude':0,
         'longitude':0,
         'altitude':0
     },
     'velocity': {
         'timestamp':0,
         'groundspeed':0,
         'airspeed':0,
         'climbrate':0,
         'altitude':0
     }
    }
   }, action) => {
     switch (action.type) {
       case "SET_ATTITUDE":
         state = {
           ...state,
           telemetry:{
               ...state.telemetry,
               attitude: action.payload
           }
         };
         break;
       
       case "SET_BATTERY":
         state = {
           ...state,
           battery: action.payload
         };
         break;
       
       case "SET_HEARTBEAT":
         state = {
           ...state,
           heartbeat: action.payload
         };
         break;

       case "SET_MISSIONITEM":
         state = {
           ...state,
           missionItem: action.payload
         };
         break;

       case "SET_MISSIONSTATE":
         state = {
           ...state,
           missionState: action.payload
         };
         break;
       
       case "SET_POSITION":
         state = {
           ...state,
           position: action.payload
         };
         break;
       
       case "SET_VELOCITY":
         state = {
           ...state,
           velocity: action.payload
         };
         break;
       
       default:
         break;
     }
     return state;
   };
   
   export default telemetryReducer;
   