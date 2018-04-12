import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { NavLink } from 'react-router-dom';

export class ActivitiesSmall extends Component {
  render() {
    const view = (<Tooltip id="view_tooltip">View Activity</Tooltip>);
    const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);
    const activities_title = [
      'Uni mapping',
      'Timelapse golden hour Würzburg',
      'Testflight new battery',
      'Rock am Main security enlightenment',
      'L-Mobile inspection cell tower',
      'F. Weiler thermal camera housing'
    ];
    var activities = [];
    for (var i = 0; i < activities_title.length; i++) {
      activities.push(<tr key={i}>
        <td>
          <i className="fa fa-fighter-jet"></i>
        </td>
        <td>
          <NavLink to="/activities" className="nav-link" activeClassName="active">
            {activities_title[i]}
          </NavLink>
        </td>
        <td className="text-right">

          <div className="stats">
            <i className="fa fa-calendar"></i>
            &nbsp;today</div>
        </td>
        {!this.props.filterDrone &&
          <td className="text-right">

            <div className="stats">
              <i className="fa fa-plane"></i>
              &nbsp;Skywalker X-8</div>
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

export default ActivitiesSmall;
