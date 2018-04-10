import React, {Component} from 'react';
import Sockette from 'sockette';

export default class LoginWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      password: 'password',
      "ws": null
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (<div className="LoginWindow">
      <section className="start">
        <p style={{
            textAlign: 'center',
            color: "white"
          }}>Just one more step to the dashboard</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input id="usr" type="text" placeholder={this.state.username} name="user" required="required" className="form-control" onChange={this.handleChangeUsername} autoComplete="username"/>
          </div>
          <div className="form-group">
            <input id="pwd" type="password" placeholder={this.state.password} name="password" required="required" className="form-control" onChange={this.handleChangePassword} autoComplete="current-password"/>
          </div>
          <div className="form-group">
            <button value="Login" className="btn btn-lg btn-success btn-block">Login</button>
          </div>
        </form>
      </section>
    </div>);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }
  myOpen() {
    var req = {
      "method": "authenticate",
      "payload": {
        "username": this.state.username,
        "password": this.state.password
      }
    };
    console.log("myreq: " + JSON.stringify(req));
    this.state.ws.send(JSON.stringify(req));
  }
  received(msg) {
    console.log("answer" + JSON.stringify(msg));
    var m = JSON.parse(msg);
    localStorage.setItem('token', m.token);
    this.setState({isLoggedIn: true})
  }
  handleSubmit(event) {
    event.preventDefault();
    // alert('user: ' + this.state.username+"\npass: "+this.state.password);

    this.setState({
      ws: new Sockette('ws://localhost/client', {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => this.myOpen(),
        onmessage: e => this.received(e.data),
        onreconnect: e => console.log('Reconnecting...', e),
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => console.log('Closed!', e),
        onerror: e => console.log('Error:', e)
      })
    });

  }

}
