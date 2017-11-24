import React, {Component} from 'react';
import logo from '../img/logo.png';
import {Link} from 'react-router-dom';

export default class TopNavbar extends Component {
  render() {
    return (<div className="TopNavbar">
      <ul className="RightTopMenu">
        <li>
          <a href="/"><img src={logo} className="Cadmas-logo" alt="Cadmas Logo"/></a>
        </li>
        <li className="right">
          <a href="/login">Anmelden</a>
        </li>
        <li className="right">
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className="right">
          <a href="/about">Funktionen</a>
        </li>
      </ul>
    </div>);
  }
}
