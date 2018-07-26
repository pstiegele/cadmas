import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import util from 'util';

class ConnectedDrones extends Component {


    render() {
        var connectedDrones = [];
        var p = 0;
        for (let i = 1; i < Object.keys(this.props.state.telemetry).length; i++) {
            const element = this.props.state.telemetry[i];
            if(element!==null&&element!==undefined){
                console.log("droneeeee: "+util.inspect(element));
                connectedDrones[p] = <NavItem eventKey={"droneNav-"+p} href={"/drone/"+i}>
                    <i className="fa fa-dashboard"></i>
                    <p>{this.props.state.drone.drones[i].name}</p>
                </NavItem>
                p++;
            }
            
        }
        return (
            //connectedDrones
            null
        );
    }
}

export default ConnectedDrones;






