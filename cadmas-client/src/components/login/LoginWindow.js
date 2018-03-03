import React, {Component} from 'react';
import io from 'socket.io-client';

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
  // alert('user: ' + this.state.username+"\npass: "+this.state.password);
   var apiBaseUrl = "https://localhost:3000/api";

   const socket = io.connect(apiBaseUrl, {rejectUnauthorized: false});
   socket.on('connect', function(){ console.log('connected'); });
  //
  //  var self = this;
  //  var payload={
  //     "email":this.state.username,
  //     "password":this.state.password
  //   }
  //   axios.post(apiBaseUrl+'login', payload)
  //   .then(function (response) {
  //   console.log(response);
  //   if(response.data.code == 200){
  //     console.log("Login successfull");
  //     var uploadScreen=[];
  //     uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
  //     self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
  //   }
  //   else if(response.data.code == 204){
  //     console.log("Username password do not match");
  //     alert("username password do not match")
  //   }
  //   else{
  //     console.log("Username does not exists");
  //     alert("Username does not exist");
  //   }
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
   event.preventDefault();
 }
}
