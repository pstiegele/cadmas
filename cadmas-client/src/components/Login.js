import React, {Component} from 'react';
import LoginWindow from './login/LoginWindow';

export default class Login extends Component {
  render() {
    return (<div className="Login">
    <div className="background-image"></div>
      <LoginWindow />
    </div>);
  }
}
