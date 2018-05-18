export function setAttitude(attitude) {
    return {type: "SET_ATTITUDE", payload: attitude};
  }
  
  export function setBattery(battery) {
    return {type: "SET_BATTERY", payload: battery};
  }
  
  export function setHeartbeat(heartbeat) {
    return {type: "SET_HEARTBEAT", payload: heartbeat};
  }
  
  export function setMissionItem(missionItem) {
    return {type: "SET_MISSIONITEM", payload: missionItem};
  }
  
  export function setMissionState(missionState) {
    return {type: "SET_MISSIONSTATE", payload: missionState};
  }
  
  export function setPosition(position) {
    return {type: "SET_POSITION", payload: position};
  }
  
  export function setVelocity(velocity) {
    return {type: "SET_VELOCITY", payload: velocity};
  }
  