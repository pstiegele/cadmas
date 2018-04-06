import React, {Component} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {NavLink} from 'react-router-dom';

export class LastFlight extends Component {
  render() {
    var lastFlight = <div>
      <div>
        <i className="fa fa-road"></i>
        &nbsp;17,4 km</div>
      <div>
        <i className="fa fa-clock-o"></i>
        &nbsp;23 min</div>
      <div>
        <i className="fa fa-battery-half"></i>
        &nbsp;34 % battery used</div>
      <div>
        <i className="fa fa-image"></i>
        &nbsp;87 photos taken</div>
      <div>
        <i className="fa fa-database"></i>
        &nbsp;267 MB payload data collected</div>
      <div>
        <Button bsStyle="default" type="button" bsSize="small" pullRight={true} fill={true}>
          See more
        </Button>&nbsp;<br/>&nbsp;
      </div>
    </div>;
    return (lastFlight);
  }
}

export default LastFlight;
