import React, { Component } from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
//import ConnectedDrones from 'elements/ConnectedDrones/ConnectedDrones.jsx';
import { connect } from "react-redux";
import { Redirect } from 'react-router';



const mapStateToProps = (state) => {
  return { user: state.user, drone: state.drone, telemetry: state.telemetry };
};


class HeaderLinks extends Component {

  constructor() {
    super();
    this.state = {
      logout: false,
      goToUser: false
    };
  }

  getUser() {
    if (this.props.user !== null && this.props.user !== undefined) {
      var ret = "";
      if (this.props.user.firstname !== undefined && this.props.user.firstname !== null) {
        ret = this.props.user.firstname;
      }
      if (this.props.user.lastname !== undefined && this.props.user.lastname !== null) {
        if (ret !== "") {
          ret = ret.concat(" " + this.props.user.lastname);
        } else {
          ret = ret.concat(" " + this.props.user.lastname);
        }
      }
      if (ret !== "") {
        return ret
      } else {
        if (this.props.user.username !== undefined && this.props.user.username !== null) {
          return this.props.user.username;
        } else {
          return "User"
        }
      }
    }
  }

  handleSelect(key) {
    if (key === "navItem-2") {
      localStorage.removeItem('token');
      this.setState({
        logout: true
      });
    }
    if (key === "navItem-1") {
      this.setState({
        goToUser: true
      });
    }
  }

  render() {
    // const notification = (<div>
    //   <i className="fa fa-globe"></i>
    //   <b className="caret"></b>
    //   <span className="notification">5</span>
    //   <p className="hidden-lg hidden-md">Notification</p>
    // </div>);
    if (this.state.logout) {
      return <Redirect push to="#" />
    }
    if (this.state.goToUser) {
      return <Redirect push to="/user" />
    }
    return (<div>
      {/* <Nav>
        <NavItem eventKey={1} href="/dashboard">
          <i className="fa fa-dashboard"></i>
          <p className="hidden-lg hidden-md">Dashboard</p>
        </NavItem>
        <NavDropdown eventKey={2} title={notification} noCaret={true} id="basic-nav-dropdown">
          <MenuItem eventKey={2.1}>Anomaly on Skywalker X-8: No storage space
          </MenuItem>
          <MenuItem eventKey={2.2}>Mission Testflug successfully completed.</MenuItem>
          <MenuItem eventKey={2.3}>Anomaly on Skywalker X-8: Battery low
          </MenuItem>
          <MenuItem eventKey={2.4}>New Drone: Skywalker X-8</MenuItem>
          <MenuItem eventKey={2.5}>Welcome to CADMAS, Paul!</MenuItem>
        </NavDropdown>
        {/* <NavItem eventKey={3} href="#">
          <i className="fa fa-search"></i>
          <p className="hidden-lg hidden-md">Search</p>
          </NavItem> 
        }
      </Nav> */}
      <Nav pullRight={true} onSelect={key => this.handleSelect(key)}>
        {/* <ConnectedDrones state={this.props} /> */}
        <NavItem eventKey={"navItem-1"}>{this.getUser()}</NavItem>
        {/* <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown-right">
          <MenuItem eventKey={2.1}>Action</MenuItem>
          <MenuItem eventKey={2.2}>Another action</MenuItem>
          <MenuItem eventKey={2.3}>Something</MenuItem>
          <MenuItem eventKey={2.4}>Another action</MenuItem>
          <MenuItem eventKey={2.5}>Something</MenuItem>
          <MenuItem divider={true}/>
          <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown> */
        }
        <NavItem eventKey={"navItem-2"}>Log out</NavItem>
      </Nav>
    </div>);
  }
}

export default connect(mapStateToProps)(HeaderLinks);

