import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  onSocketOpen() {
    console.log('Connection established!')
  }

  onSocketData(message) {
    let decoded = JSON.parse(message.data)
  }
  onSocketClose() {}
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost')
    this.socket.onopen = () => this.onSocketOpen()
    this.socket.onmessage = (m) => this.onSocketData(m)
    this.socket.onclose = () => this.onSocketClose()
  }
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to Pauls fantastic React App, yeah! awesome</h1>
      </header>
      <p className="App-intro">
        To get started, edit
        <code>src/App.js</code>
        and save to reload.
      </p>
    </div>);
  }
}

export default App;
