import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import About from './About';

export default class Wrapper extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/about' component={About} />
        </Switch>
      </main>);
  }
}
