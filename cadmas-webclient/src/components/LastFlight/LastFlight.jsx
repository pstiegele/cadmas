import React, {Component} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {NavLink} from 'react-router-dom';

export class LastFlight extends Component {
  constructor(props) {
    super(props);
    this.handleSeeMoreClick = this.handleSeeMoreClick.bind();
  }
  handleSeeMoreClick() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "rgb(139, 195, 74)";
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 10);
    ctx.lineTo(11, 16);
    ctx.lineTo(13, 18);
    ctx.lineTo(7, 24);
    ctx.lineTo(14, 34);
    ctx.lineTo(25, 48);
    ctx.lineTo(68, 79);
    ctx.lineTo(86, 82);
    ctx.lineTo(92, 97);
    ctx.lineTo(91, 95);
    ctx.lineTo(102, 101);
    ctx.lineTo(91, 92);
    ctx.lineTo(85, 82);
    ctx.lineTo(73, 95);
    ctx.lineTo(48, 121);
    ctx.lineTo(39, 95);
    ctx.lineTo(31, 78);
    ctx.lineTo(27, 59);
    ctx.lineTo(24, 47);
    ctx.lineTo(27, 35);
    ctx.lineTo(18, 39);
    ctx.lineTo(15, 31);
    ctx.lineTo(27, 25);
    ctx.lineTo(24, 22);
    ctx.lineTo(16, 15);
    ctx.lineTo(9, 10);
    ctx.lineTo(4, 6);
    ctx.lineTo(0, 0);
    ctx.stroke();
  }
  render() {
    var lastFlight = <div className="flex-row">

      <div className="col-xs-8">
        <div>
          <p>
            <i className="fa fa-globe"></i>
            &nbsp;&nbsp;Würzburg</p>
        </div>
        <div>
          <p>
            <i className="fa fa-road"></i>
            &nbsp;&nbsp;17,4 km</p>
        </div>

        <div>
          <p>
            <i className="fa fa-clock-o"></i>
            &nbsp;&nbsp;23 min</p>
        </div>

        <div>
          <p>
            <i className="fa fa-battery-half"></i>
            &nbsp;&nbsp;34 % battery used</p>
        </div>

        <div>
          <p>
            <i className="fa fa-image"></i>
            &nbsp;&nbsp;87 photos taken</p>
        </div>

        <div>
          <p>
            <i className="fa fa-database"></i>
            &nbsp;&nbsp;267 MB payload data collected
          </p>
        </div>

        <div>
          {/* <NavLink to="/activities" className="nav-link" activeClassName="active"> */}

          &nbsp;<br/>&nbsp;
        </div>
      </div>
      <div className="col-xs-4">
        <canvas id="myCanvas" width="102" height="121"></canvas>
        <Button className="mt-1" bsStyle="default" type="button" bsSize="small" pullRight={true} fill={true} onClick={() => this.handleSeeMoreClick()}>
          See more
        </Button>
      </div>
    </div>;
    return (lastFlight);
  }
}

export default LastFlight;
