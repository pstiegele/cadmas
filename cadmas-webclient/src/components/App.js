import React, {Component} from 'react';
import '../css/App.css';

import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'
import Wrapper from './Wrapper'


class App extends Component {
  render() {
    return (
        <div className="App">
          <TopNavbar/>
          <SideNavbar/>
          <Wrapper/>
        </div>
    );
  }
}

export default App;
