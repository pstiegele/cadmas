import React, {Component} from 'react';
import logo from '../img/logo.png';
import {Link} from 'react-router-dom';

export default class TopNavbar extends Component {
  render() {
    return (<div className="TopNavbar">
      <ul className="RightTopMenu">
        <li>
          <Link to="/"><img src={logo} className="Cadmas-logo" alt="Cadmas Logo"/></Link>
        </li>

        <li className="right">
          <Link to="/dashboard">{this.props.username}</Link>
        </li>
        <li className="right">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="right">
          <Link to="/about">Funktionen</Link>
        </li>
      </ul>
    </div>);
  }
}
