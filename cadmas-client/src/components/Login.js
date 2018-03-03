import React, {Component} from 'react';
import LoginWindow from './login/LoginWindow';

export default class Login extends Component {
  render() {
    return (<div className="Login">
    <div className="background-image"></div>
    <div className="col-md-2 col-md-offset-5">
      <LoginWindow style={{maxWidth:"350px"}}/>
      </div>
    </div>);
  }
}
