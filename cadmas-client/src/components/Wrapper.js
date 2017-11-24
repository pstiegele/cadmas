import React, {Component} from 'react';
import Home from './Home';
import Dashboard from './Dashboard';

export default class Wrapper extends Component {
  render() {
    return (<div className="Wrapper">
      <Home/>
    </div>);
  }
}
