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
    for (var i = this.props.activity.activities.length-1; i >=0&&this.props.activity.activities.length-1-i<8; i--) {
      activities.push(<tr key={this.props.activity.activities[i].activityID}>
        <td>
          <i className="fa fa-fighter-jet"></i>
        </td>
        <td>
          <NavLink to={"/activities/" + this.props.activity.activities[i].activityID} className="nav-link" activeClassName="active">
            {this.props.activity.activities[i].name}
          </NavLink>
        </td>
        <td className="text-left">

          <div className="stats">
            <i className="fa fa-calendar"></i>
            &nbsp;{moment(this.props.activity.activities[i].dt_created, "YYYY-MM-DDTHH:mm:ss.SSSZ").fromNow()}</div>
        </td>
        {!this.props.filterDrone &&
          <td className="text-left">

            <div className="stats">
              <i className="fa fa-plane"></i> 
              &nbsp;{this.getDroneName(this.props.activity.activities[i].droneID).name}</div>
          </td>
        }

        <td className="td-actions text-right">
          <OverlayTrigger placement="top" overlay={view}>
            <Button bsStyle="info" simple type="button" bsSize="xs">
              <i className="fa fa-search"></i>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={remove}>
            <Button bsStyle="danger" simple type="button" bsSize="xs">
              <i className="fa fa-times"></i>
            </Button>
          </OverlayTrigger>

        </td>
      </tr>);
    }
    return (<tbody>
      {activities}
    </tbody>);
  }
}

export default connect(mapStateToProps)(ActivitiesSmall);
