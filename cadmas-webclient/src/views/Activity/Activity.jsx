import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FlightModeControlButtons from 'elements/FlightModeControlButtons/FlightModeControlButtons.jsx';

import ActivitySummary from 'components/ActivitySummary/ActivitySummary';
import DroneSmall from 'components/DroneSmall/DroneSmall';
import BatteryUsage from 'components/BatteryUsage/BatteryUsage';
import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import Maps from '../Maps/Maps';
import Airspeed from '../../components/FlightInstruments/Airspeed';
import Altimeter from '../../components/FlightInstruments/Altimeter';
import Attitude from '../../components/FlightInstruments/Attitude';
import Heading from '../../components/FlightInstruments/Heading';
import TurnCoordinator from '../../components/FlightInstruments/TurnCoordinator';
import Variometer from '../../components/FlightInstruments/Variometer';


//import util from 'util';



const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity, telemetry: state.telemetry };
};

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = { activityID: parseInt(this.props.match.params.activityID, 10) };

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
    return this.getSafe(() => activity.droneID, 0)
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

  getLiveActivityTitle(activityID) {
    var res;
    var name = this.getSafeActivityName(activityID);
    var controlButtons = <span className="pull-right">
      <FlightModeControlButtons activityID={activityID} state={parseInt(this.getSafeActivityState(this.state.activityID), 10)}/></span>
    res = <div>{name}{controlButtons}</div>
    return res;
  }
  getActivityTitle(activityID) {
    var res;
    var name = this.getSafeActivityName(activityID);
    var controlButtons = <span className="pull-right">
      <FlightModeControlButtons activityID={activityID} state={parseInt(this.getSafeActivityState(this.state.activityID), 10)} /></span>
    res = <div>{name}{controlButtons}</div>
    return res;
  }
  getSafeActivityName(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).name, "");
  }
  getSafeTelemetry() {
    var telemetry = this.getSafe(() => this.props.telemetry[parseInt(this.getSafeDroneID(this.getActivityByID(this.state.activityID)), 10)], this.props.telemetry[0]);
    if (telemetry === undefined || telemetry === null)
      return this.props.telemetry[0];
    return telemetry;
  }
  getSafeTelemetryAttitude() {
    if (this.getSafeTelemetry().attitude === undefined || this.getSafeTelemetry().attitude === null)
      return this.props.telemetry[0].attitude;
    return this.getSafeTelemetry().attitude;
  }
  getSafeTelemetryBattery() {
    if (this.getSafeTelemetry().battery === undefined || this.getSafeTelemetry().battery === null)
      return this.props.telemetry[0].battery;
    return this.getSafeTelemetry().battery;
  }
  getSafeTelemetryHeartbeat() {
    if (this.getSafeTelemetry().heartbeat === undefined || this.getSafeTelemetry().heartbeat === null)
      return this.props.telemetry[0].heartbeat;
    return this.getSafeTelemetry().heartbeat;
  }
  getSafeTelemetryMissionState() {
    if (this.getSafeTelemetry().missionState === undefined || this.getSafeTelemetry().missionState === null)
      return this.props.telemetry[0].missionState;
    return this.getSafeTelemetry().missionState;
  }
  getSafeTelemetryPosition() {
    if (this.getSafeTelemetry().position === undefined || this.getSafeTelemetry().position === null)
      return this.props.telemetry[0].position;
    return this.getSafeTelemetry().position;
  }
  getSafeTelemetryVelocity() {
    if (this.getSafeTelemetry().velocity === undefined || this.getSafeTelemetry().velocity === null)
      return this.props.telemetry[0].velocity;
    return this.getSafeTelemetry().velocity;
  }
  getSafeTelemetryRoute() {
    if (this.getSafeTelemetry().route === undefined || this.getSafeTelemetry().route === null)
      return this.props.telemetry[0].route;
    return this.getSafeTelemetry().route;
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


  handleStop() {

  }

  getDate() {
    var start;
    if (parseInt(this.getSafeActivityState(this.state.activityID), 10) === 2) {

      start = parseInt(this.getSafeActivityDtCreated(this.state.activityID), 10);
      var end = parseInt(this.getSafeActivityDtEnded(this.state.activityID), 10);
      return this.getAbsoluteDate(start) + " - " + this.getAbsoluteEndDate(start, end) + " (" + this.getRelativeDate(start) + ", duration: " + this.getDuration(end - start) + ")";
    } else {
      start = parseInt(this.getSafeActivityDtCreated(this.state.activityID), 10);
      return this.getAbsoluteDate(start) + " (" + this.getRelativeDate(start) + ")";

    }
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
          <Card title={this.getActivityTitle(this.state.activityID)} category={<span>{this.getDate()}<br />{this.getState()}</span>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
            <div style={{ height: "60%" }}>
              <Maps />
            </div>

          } />
          <Col md={4}>
            <Card title="Battery Usage" category={0} stats="~ 12 % per hour" statsIcon="fa fa-clock-o" content={<div><BatteryUsage activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
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
        <Col lg={7}>
          <Card title={this.getLiveActivityTitle(this.state.activityID)} category={<span>{this.getDate()}<br />{this.getState()}</span>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
            <div style={{ height: "50%" }}>
              <Maps
                longitude={this.getSafeTelemetryPosition().longitude}
                latitude={this.getSafeTelemetryPosition().latitude}
                route={JSON.parse(JSON.stringify(this.getSafeTelemetryRoute()))
                }

              />
            </div>

          } />
          <Col lg={2}>
            <TurnCoordinator showBox={false} size={100} turn={this.getSafeTelemetryAttitude().roll} />
          </Col>
          <Col md={5}>
            <Card title="altitude profile " content={<div>Bla bla</div>} />
          </Col>
          <Col md={5}>
            <Card title="battery" content={<div>Battery goes here</div>} />
          </Col>
          <Col md={4}>
            <Card title="flight statistics" content={<div>Content here!</div>} />
          </Col>
          <Col md={4}>
            <Card title="notifications" content={<div>Notifications goes here</div>} />
          </Col>
          <Col md={4}>
            <Card title="payload" content={<div>Payload goes here</div>} />
          </Col>
        </Col>
        <Col lg={5}>
          <Col lg={12} >
            <div>
              <img alt="onboard-camera" src="https://dummyimage.com/300x200/000/51ff00.jpg&text=Onboard+Camera" style={{ verticalAlign: "top", paddingTop: "45px" }}></img>
              <Airspeed showBox={false} size={300} speed={this.getSafeTelemetryVelocity().airspeed} />
            </div>
          </Col>
          <Col lg={12}>
            <Attitude showBox={false} size={300} roll={this.getSafeTelemetryAttitude().roll} pitch={this.getSafeTelemetryAttitude().pitch} />
            <Altimeter showBox={false} size={300} absoluteAltitude={this.getSafeTelemetryPosition().altitudeAbsolute} altitude={this.getSafeTelemetryPosition().altitudeRelative} />
          </Col>
          <Col lg={12}>
            <Heading showBox={false} size={300} heading={this.getSafeTelemetryAttitude().heading} />
            <Variometer showBox={false} size={300} vario={this.getSafeTelemetryVelocity().climbrate} />
          </Col>

        </Col>
      </Row>

    </Grid>
  }
  // getRoute(){
  //   var r = this.polyline.slice(0);
  //   return r;
  // }
  // polyline = [
  //   { "lat": -35.275307, "lng": 148.93459 }, 
  //   { "lat": -35.275307, "lng": 148.93459 }, 
  //   { "lat": -35.275307, "lng": 148.93459 }, 
  //   { "lat": -35.275406, "lng": 148.93457 }, 
  //   { "lat": -35.275406, "lng": 148.93457 }, 
  //   { "lat": -35.275406, "lng": 148.93457 }, 
  //   { "lat": -35.275406, "lng": 148.93457 }, 
  //   { "lat": -35.275406, "lng": 148.93457 }, 
  //   { "lat": -35.275406, "lng": 148.93457 }, 
  //   { "lat": -35.275406, "lng": 148.93457 }
  // ];


  // componentWillUpdate(nextProps) {
  //   this.polyline.push({
  //     lat: parseInt(this.getSafeTelemetryPosition().latitude,10),
  //     lng: parseInt(this.getSafeTelemetryPosition().longitude,10)
  //   });
  // }
  render() {
    return (<div className="content">
      {parseInt(this.getSafeActivityState(this.state.activityID), 10) === 1 ? this.getLiveActivity() : this.getNormalActivity()}

    </div>);
  }
}
export default connect(mapStateToProps)(Activity);
