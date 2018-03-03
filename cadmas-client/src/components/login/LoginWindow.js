import React, {Component} from 'react';

export default class LoginWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      password: 'password'
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (<div className="LoginWindow">
      <section className="start">
        <h3 style={{
            textAlign: 'center',
            color: "white"
          }}>Just one more step to the dashboard</h3>
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

 handleSubmit(event) {
   alert('user: ' + this.state.username+"\npass: "+this.state.password);
   event.preventDefault();
 }
}
