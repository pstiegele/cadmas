import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';

import ActivitySummary from 'components/ActivitySummary/ActivitySummary';
import DroneSmall from 'components/DroneSmall/DroneSmall';
import BatteryUsage from 'components/BatteryUsage/BatteryUsage';
import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import Maps from '../Maps/Maps';
import Attitude from '../../components/FlightInstruments/Attitude';


//import util from 'util';




const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity, telemetry: state.telemetry };
};

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = { activityID: parseInt(this.props.match.params.activityID, 10) };

  }
  componentDidMount(){
    

  }

  getRelativeOrAbsoluteDate(date) {
    if (new Date() - new Date(date * 1000) < 604800000) {
      return moment(date * 1000).fromNow();
    } else {
      return moment(date * 1000).locale("de", localization).format("LLL");
    }
  }
  getAbsoluteDate(date) {
    return moment(date * 1000).locale("de", localization).format("LLL");
  }
  getRelativeDate(date) {
    return moment(date * 1000).fromNow();
  }
  getAbsoluteEndDate(start, end) {
    if (moment.duration((end - start) * 1000).asDays() > 1) {
      return moment(end * 1000).format("LLL");
    } else {
      return moment(end * 1000).format("LT");
    }
  }
  getDuration(duration) {
    if (moment.duration(duration * 1000).asMinutes() > 60) {
      if (moment.duration(duration * 1000).asHours() > 24) {
        return Math.round(moment.duration(duration * 1000).asDays()) + " days";
      } else {
        return Math.round(moment.duration(duration * 1000).asHours()) + " hours";
      }
    } else {
      return Math.round(moment.duration(duration * 1000).asMinutes()) + " min";
    }

  }

  getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  getSafeDrone(droneID) {
    return this.getSafe(() => this.getDroneByID(droneID), "")
  }
  getSafeDroneName(droneID) {
    return this.getSafe(() => this.getDroneByID(droneID).name, "")
  }
  getSafeDroneID(activity) {
    return this.getSafe(() => activity.droneID, "")
  }
  getSafeDroneVehicleType(droneID) {
    return this.getSafe(() => this.getDroneByID(droneID).vehicleType, "")
  }
  getDroneByID(droneID) {
    var result = this.props.drone.drones.filter(function (obj) {
      return obj.droneID === droneID;
    });
    return result[0];
  }

  getSafeMissionName(missionID) {
    return this.getSafe(() => this.getMissionByID(missionID).name, "")
  }
  getMissionByID(missionID) {
    var result = this.props.mission.missions.filter(function (obj) {
      return obj.missionID === missionID;
    });
    return result[0];
  }
  getSafeActivityName(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).name, "")
  }
  getSafeActivityDtCreated(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).dt_created, "")
  }
  getSafeActivityDtEnded(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).dt_ended, "")
  }
  getSafeActivityState(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).state, "")
  }
  getActivityByID(activityID) {
    var result = this.props.activity.activities.filter(function (obj) {
      return obj.activityID === activityID;
    });
    return result[0];
  }

  handleClick(that) {
    this.setState({ redirect: true, redirectToActivity: that._targetInst.return.key });
  }

  getDate() {
    var start = parseInt(this.getSafeActivityDtCreated(this.state.activityID), 10);
    var end = parseInt(this.getSafeActivityDtEnded(this.state.activityID), 10);
    return this.getAbsoluteDate(start) + " - " + this.getAbsoluteEndDate(start, end) + " (" + this.getRelativeDate(start) + ", duration: " + this.getDuration(end - start) + ")";
  }

  getState() {
    var state = parseInt(this.getSafeActivityState(this.state.activityID), 10);
    switch (state) {
      case 0:
        return <span><i className="fa fa-circle" style={{ color: "grey" }} key={"activityStatus"}></i>{" activity has not started yet."}</span>;


      case 1:
        return <span><i className="fa fa-circle" style={{ color: "red" }} key={"activityStatus"}></i>{" activity is currently live"}</span>;


      case 2:
        return <span><i className="fa fa-circle" style={{ color: "green" }} key={"activityStatus"}></i>{" activity was successfully completed"}</span>;


      default:
        break;
    }
  }

  getNormalActivity() {
    return <Grid fluid>
      <Row>
        <Col md={8}>
          <Card title={this.getSafeActivityName(this.state.activityID)} category={<span>{this.getDate()}<br />{this.getState()}</span>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
            <div style={{ height: "60%" }}>
              <Maps />
            </div>

          } />
          <Col md={4}>
            <Card title="Battery Usage" category={this.props.telemetry.telemetry.attitude.pitch} stats="~ 12 % per hour" statsIcon="fa fa-clock-o" content={<div><BatteryUsage activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Col>
          <Col md={4}>
            <Card title="Notifications" category={this.getSafeDroneName(this.props.activity.activities[this.props.activity.activities.length - 1].droneID)} stats={moment(this.props.activity.activities[this.props.activity.activities.length - 1].dt_created * 1000).fromNow()} statsIcon="fa fa-clock-o" content={<div><ActivitySummary activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Col>
          <Col md={4}>
            <Card title="Height Profile" category={this.getSafeDroneName(this.props.activity.activities[this.props.activity.activities.length - 1].droneID)} stats={moment(this.props.activity.activities[this.props.activity.activities.length - 1].dt_created * 1000).fromNow()} statsIcon="fa fa-clock-o" content={<div><ActivitySummary activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Col>
        </Col>
        <Col md={4}>
          <Row>
            <Card title="Activity summary" content={<div><ActivitySummary activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Row>
          <Row>
            <Card title={this.getSafeDroneName(this.getSafeDroneID(this.getActivityByID(this.state.activityID)))} category={this.getSafeDroneVehicleType(this.getSafeDroneID(this.getActivityByID(this.state.activityID)))} content={
              <div>
                <DroneSmall droneToShow={this.getSafeDrone(this.getSafeDroneID(this.getActivityByID(this.state.activityID)))} />
              </div>
            } />
          </Row>
          <Row>
            <Card title="Payload" category={this.getSafeDroneName(this.props.activity.activities[this.props.activity.activities.length - 1].droneID)} stats={moment(this.props.activity.activities[this.props.activity.activities.length - 1].dt_created * 1000).fromNow()} statsIcon="fa fa-clock-o" content={<div><ActivitySummary activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Row>
        </Col>
      </Row>

    </Grid>
  }

  getLiveActivity() {
    return <Grid fluid>
    <Row>
      <Col lg={6}>
        <Card title={this.getSafeActivityName(this.state.activityID)} category={<span>{this.getDate()}<br />{this.getState()}</span>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
          <div style={{ height: "50%" }}>
            <Maps />
          </div>

        } />
        <Col md={4}>
          <Card title="flight statistics" content={<div>Content here!</div>} />
        </Col>
        <Col md={4}>
          <Card title="altitude profile " content={<div>Bla bla</div>} />
        </Col>
        <Col md={4}>
          <Card title="battery" content={<div>Battery goes here</div>} />
        </Col>
        <Col md={4}>
          <Card title="notifications" content={<div>Notifications goes here</div>} />
        </Col>
        <Col md={4}>
          <Card title="payload" content={<div>Payload goes here</div>} />
        </Col>
      </Col>
      <Col lg={3}>
          <Card title="Onboard camera" content={<div>Hey ho</div>} />
          <Card title="Airspeed" content={<div>Hey cool</div>} />
          <Card title="Altitude" content={<div>Bonjour</div>} />
      </Col>
      <Col lg={3}>
         <Attitude roll={this.props.telemetry.telemetry.attitude.roll} pitch={this.props.telemetry.telemetry.attitude.pitch}/>
          <Card title="Heading"  content={<div>mooooore content!</div>} />
          <Card title="Variometer" content={<div>it's enough for now</div>} />
      </Col>
    </Row>

  </Grid>
  }
  render() {
    return (<div className="content">
    {parseInt(this.getSafeActivityState(this.state.activityID), 10)=== 1 ? this.getLiveActivity() : this.getNormalActivity()}

    </div>);
  }
}
export default connect(mapStateToProps)(Activity);
