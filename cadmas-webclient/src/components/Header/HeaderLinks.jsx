import React, {Component} from 'react';
import {NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import ConnectedDrones from 'elements/ConnectedDrones/ConnectedDrones.jsx';
import { connect } from "react-redux";



const mapStateToProps = (state) => {
  return { drone: state.drone, telemetry: state.telemetry };
};


class HeaderLinks extends Component {
  
  render() {
    const notification = (<div>
      <i className="fa fa-globe"></i>
      <b className="caret"></b>
      <span className="notification">5</span>
      <p className="hidden-lg hidden-md">Notification</p>
    </div>);
    return (<div>
      <Nav>
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
          </NavItem> */
        }
      </Nav>
      <Nav pullRight={true}>
      <ConnectedDrones state={this.props} />
        <NavItem eventKey={1} href="#">User</NavItem>
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
        <NavItem eventKey={3} href="#" >Log out</NavItem>
      </Nav>
    </div>);
  }
}

export default connect(mapStateToProps)(HeaderLinks);

