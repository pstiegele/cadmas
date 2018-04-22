class CadmasWS{
    constructor(){
        this.initWS();
    }
    initWS(){
        console.log("hey ho");
        var token = localStorage.getItem("token");
        if(!token){
          console.log("authenticate first! "+window.location.hostname);
          var authSocket = new WebSocket("ws://"+window.location.hostname+"/auth");
          authSocket.onmessage = function (event) {
            var msg = JSON.parse(event.data);
            switch (msg.method) {
              case "authentication":
                if (msg.payload.successful) {
                  localStorage.setItem('token', msg.payload.token);
                  console.log("authenticated successfully");
    
                } else {
                  console.log("authentication failed");
                }
                break;
              default:
                break;
            }
    
            console.log("auth-ws received: " + msg.method);
          }
          authSocket.onopen = function (event) {
            var msg = {
              "method": "authenticate",
              "payload": {
                "username": "ps",
                "password": "123"
              }
            };
            authSocket.send(JSON.stringify(msg));
            console.log("authenticate sent");
            
          };
        }
        if (token) {
    
          var socket = new WebSocket("ws://"+window.location.hostname+"/client?token="+token, token);
          socket.onmessage = function (event) {
            var msg = JSON.parse(event.data);
            switch (msg.method) {
              case "authentication":
                if (msg.payload.successful) {
                  localStorage.setItem('token', msg.payload.token);
                  //document.getElementsByClassName("numbers")[0].innerHTML = new Date();
                  console.log("authenticated successfully");
    
                } else {
                  console.log("authentication failed");
                }
                break;
              case "addMissionACK":
                //console.log('addMissionACK');
                
                break;
    
              case "activities":
                console.log("activities: "+JSON.stringify(msg));
                break;
    
              default:
                break;
            }
    
            console.log("ws received: " + msg.method);
          }
          socket.onopen = function (event) {
            var msg = {
              "method": "addMission",
              "payload": {
                "name": "MyCadmasMission",
                "note": "First web Mission",
                "onConnectionLostMode": "LAND"
              }
            };
            socket.send(JSON.stringify(msg));
            console.log("addMission sent");
            
          };
    
        }
    }
}
export default CadmasWS;
