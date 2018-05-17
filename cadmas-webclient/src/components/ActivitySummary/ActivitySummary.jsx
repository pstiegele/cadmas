import React, { Component } from 'react';
// import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
// import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import { setUser, setMapIsShown } from "actions/userActions";

const mapStateToProps = (state) => {
  return { user: state.user, activity: state.activity };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    setMapIsShown: (mapIsShown) => {
      dispatch(setMapIsShown(mapIsShown));
    }
  };
};

class ActivitySummary extends Component {
  constructor(props) {
    super(props);
    this.handleSeeMoreClick = this.handleSeeMoreClick.bind(this);
    this.showMap = this.showMap.bind(this);
    this.hideMap = this.hideMap.bind(this);
  }
  componentDidMount() {
    if (this.props.showMap) {
      this.showMap();
    }
  }
  showMap() {
    var c = document.getElementById("myCanvas");
    c.style.display = "inline-block";
    var ctx = c.getContext("2d");
    ctx.fillStyle = "rgb(139, 195, 74)";
    ctx.strokeStyle = "#8bc34a";
    ctx.lineCap = "round";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "black";
    ctx.lineWidth = 3;
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
  hideMap() {
    var c = document.getElementById("myCanvas");
    c.style.display = "none";
  }
  handleSeeMoreClick(mapIsShown) {
    if (mapIsShown) {
      this.hideMap();
      this.props.setMapIsShown(false);
    } else {
      this.showMap();
      this.props.setMapIsShown(true);
    }

  }
  getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  render() {
    var ActivitySummary = <div>
      <div className="row">
        <div className="col-lg-8">
          {this.props.showActivityName ?
            <div>
              <p>
                <i className="fa fa-globe"></i>
                &nbsp;&nbsp;{this.getSafe(() => this.props.activityToShow.name, "")}</p>
            </div> : ""}
          <div>
            <p>
              <i className="fa fa-road"></i>
              &nbsp;&nbsp;17,4 km</p>
          </div>

          <div>
            <p>
              <i className="fa fa-clock-o"></i>
              &nbsp;&nbsp;{this.getSafe(() => this.props.activityToShow.duration + " min", "")}</p>
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
        </div>
        {this.props.showMap ?
          <div className="col-lg-4">
            <canvas id="myCanvas"></canvas>
          </div> : ""}

      </div>
      <div className="row">
        <div className="col-lg-12 text-right">
          {this.props.showSeeMoreButton ? <Button className="pt-1" bsStyle="default" type="button" bsSize="small" pullRight={true} fill={true} onClick={() => this.handleSeeMoreClick(this.props.user.mapIsShown)}>
            See more
          </Button> : ""}
        </div>
      </div>
    </div>;
    return (ActivitySummary);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySummary);
