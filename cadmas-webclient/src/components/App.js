import React, {Component} from 'react';
import '../css/App.css';
import {connect} from "react-redux";

import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'
import Wrapper from './Wrapper'

import {setName} from "../actions/userActions";

class App extends Component {

  render() {
    return (<div className="App">
      <TopNavbar username={this.props.user.name}/>
      <SideNavbar/>
      <Wrapper/>
    </div>);
  }
}
const mapStateToProps = (state) => {
  return {user: state.user, ws: state.ws};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
