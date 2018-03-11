import * as types from '../constants/ActionTypes'
import {addUser, messageReceived, populateUsersList} from '../actions'
import Sockette from 'sockette';

const setupSocket = (dispatch, username) => {
  ws : new Sockette('ws://localhost/client', {
    timeout: 5e3,
    maxAttempts: 10,
    onopen: e => onopen(),
    onmessage: e => onmessage(e),
    onreconnect: e => console.log('Reconnecting...', e),
    onmaximum: e => console.log('Stop Attempting!', e),
    onclose: e => console.log('Closed!', e),
    onerror: e => console.log('Error:', e)
  }

  socket.onopen = () => {
    var req = {
      "method": "renewToken",
      "token": localStorage.getItem('token')
    };
    socket.send(JSON.stringify(req));
  }
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.method) {
      case "renewToken":
        dispatch(messageReceived(data.message, data.author))
        break
      case "login":
        dispatch(addUser(data.name))
        break
      case "getDrones":
        dispatch(populateUsersList(data.users))
        break
      default:
        break
    }
  }
  return socket}

export default setupSocket
