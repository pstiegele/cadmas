import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import moment from 'moment';


const mapStateToProps = (state) => {
  return { activity: state.activity, drone: state.drone };
};




class ActivitiesSmall extends Component {
  constructor(props) {
    super(props);
    this.getDroneName = this.getDroneName.bind(this);
    
  }

  
  getActivityStyle(state) {
    switch (state) {
      case "0":
        return { color: "grey" };
      case "1":
        return { color: "red", animation: "blinker 1s linear infinite" };
      case "2":
        return { color: "green" };

      default:
        return {};
    }
  }

  getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  getSafeDroneName(i) {
    return this.getSafe(() => this.getDroneName(this.props.activity.activities[i].droneID).name, "")
  }
  getDroneName(droneID) {
    var result = this.props.drone.drones.filter(function (obj) {
      return obj.droneID === droneID;
    });
    return result[0];
  }
  render() {
    const view = (<Tooltip id="view_tooltip">View Activity</Tooltip>);
    const remove = (<Tooltip id="remove_tooltip">Remove Activity</Tooltip>);
    var activities = [];
    var counter = 0;
    for (var i = this.props.activity.activities.length - 1; i >= 0 && counter < 8; i--) {
      if (!this.props.droneID || this.props.droneID === this.props.activity.activities[i].droneID) {
        counter++;
        activities.push(<tr style={this.getActivityStyle(this.props.activity.activities[i].state)} key={this.props.activity.activities[i].activityID}>
          <td>
            <i className="fa fa-fighter-jet"></i>
          </td>
          <td>
            <NavLink to={"/activity/" + this.props.activity.activities[i].activityID} className="nav-link" activeClassName="active">
              {this.props.activity.activities[i].name}
            </NavLink>
          </td>
          <td className="text-left">

            <div className="stats">
              <i className="fa fa-calendar"></i>
              &nbsp;{moment(this.props.activity.activities[i].dt_created * 1000).fromNow()}</div>
          </td>
          {!this.props.filterDrone &&
            <td className="text-left">

              <div className="stats">
                <i className="fa fa-plane"></i>
                &nbsp;{this.getSafeDroneName(i)}</div>
            </td>
          }

          <td className="td-actions text-right">
            <OverlayTrigger placement="top" overlay={view}>
              <NavLink to={"/activity/" + this.props.activity.activities[i].activityID} className="nav-link" activeClassName="active">
                <Button bsStyle="info" simple type="button" bsSize="xs">
                  <i className="fa fa-search"></i>
                </Button>
              </NavLink>
            </OverlayTrigger>


          </td>
        </tr>);
      }

    }
    return (<tbody>
      {activities}
    </tbody>);
  }
}

export default connect(mapStateToProps)(ActivitiesSmall);
