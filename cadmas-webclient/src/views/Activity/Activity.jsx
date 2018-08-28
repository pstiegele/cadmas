import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FlightModeControlButtons from 'elements/FlightModeControlButtons/FlightModeControlButtons.jsx';

import ActivitySummary from 'components/ActivitySummary/ActivitySummary';
import DroneSmall from 'components/DroneSmall/DroneSmall';
import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import Maps from '../Maps/Maps';
import Airspeed from '../../components/FlightInstruments/Airspeed';
import Altimeter from '../../components/FlightInstruments/Altimeter';
import Attitude from '../../components/FlightInstruments/Attitude';
import Heading from '../../components/FlightInstruments/Heading';
//import TurnCoordinator from '../../components/FlightInstruments/TurnCoordinator';
import Variometer from '../../components/FlightInstruments/Variometer';
import CadmasWS from '../../websocket/CadmasWS';
import Gauge from 'react-svg-gauge';
import NotificationSystem from 'react-notification-system';
import { style } from "variables/Variables.jsx";
import AltitudeProfile from 'components/AltitudeProfile/AltitudeProfile';
//import util from 'util';




const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity, telemetry: state.telemetry };
};

class Activity extends Component {
  thereWasAlreadyAMissingTelemetryNotification = moment();
  thereWasMissingTelemetry = false;
  constructor(props) {
    super(props);
    this.state = {
      activityID: parseInt(this.props.match.params.activityID, 10),
      overallMaxBatteryCurrent: 3,
      _notificationSystem: null
    };
    this.getFullMissionAlreadyRequested = false;
    this.getFullActivityAlreadyRequested = false;
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  componentDidUpdate() {
    if (!this.getFullMissionAlreadyRequested && this.getSafeMissionID() !== "" && this.getSafeMissionID() !== -1) {
      this.getFullMissionAlreadyRequested = true;
      CadmasWS.getFullMission(this.getSafeMissionID());
    }
    if (!this.getFullActivityAlreadyRequested && this.state.activityID !== "" && this.state.activityID !== -1) {
      this.getFullActivityAlreadyRequested = true;
      CadmasWS.getFullActivity(this.state.activityID);
    }
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
  getSafeDroneConnectStatus(activity) {
    return this.getSafe(() => this.getSafeDrone(activity.droneID).connected, false)
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
  getSafeMissionID() {
    return this.getSafe(() => this.getActivityByID(this.state.activityID).missionID, -1)
  }
  getMissionByID(missionID) {
    var result = this.props.mission.missions.filter(function (obj) {
      return obj.missionID === missionID;
    });
    return result[0];
  }
  getSafeMission() {
    return this.getSafe(() => this.getMissionByID(this.getSafeMissionID()), this.props.mission.missions[0]);
  }

  getLiveActivityTitle(activityID) {
    var res;
    var name = this.getSafeActivityName(activityID);
    var controlButtons = <span className="pull-right">
      <FlightModeControlButtons activityID={activityID} droneConnected={this.getSafeDroneConnectStatus(this.getActivityByID(this.state.activityID))} state={parseInt(this.getSafeActivityState(this.state.activityID), 10)} droneID={parseInt(this.getSafeDroneID(this.getActivityByID(this.state.activityID)), 10)} heartbeat={this.getSafeTelemetryHeartbeat()} /></span>
    res = <div>{name}{controlButtons}</div>
    return res;
  }
  getActivityTitle(activityID) {
    var res;
    var name = this.getSafeActivityName(activityID);
    var controlButtons = <span className="pull-right">
      <FlightModeControlButtons activityID={activityID} activities={this.props.activity.activities} droneConnected={this.getSafeDroneConnectStatus(this.getActivityByID(this.state.activityID))} droneID={parseInt(this.getSafeDroneID(this.getActivityByID(this.state.activityID)), 10)} state={parseInt(this.getSafeActivityState(this.state.activityID), 10)} /></span>
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
  getSafeTelemetryCameraImage() {
    if (this.getSafeTelemetry().cameraImage === undefined || this.getSafeTelemetry().cameraImage === null) {
      return this.props.telemetry[0].cameraImage;
    }
    return this.getSafeTelemetry().cameraImage;
  }
  getSafeTelemetryRoute() {
    if (this.getSafeTelemetry().route === undefined || this.getSafeTelemetry().route === null)
      return this.props.telemetry[0].route;
    return this.getSafeTelemetry().route;
  }
  getSafeHistoryTelemetryPositions() {
    var res = this.getSafe(() => this.getActivityByID(this.state.activityID).historyTelemetryPositions, "");
    if(res===undefined||res===null||res===""||res===[]){
      return [];
    }else{
      return res;
    }
  }
  getSafeWaypoints() {
    var mission = this.getSafeMission();
    if (mission === undefined || mission === "" || mission === null) {
      return [{
        'missionIndex': 0,
        'type': 'LAND',
        'altitude': 0,
        'lat': 0,
        'lng': 0
      }];
    }
    var waypoints = this.getSafe(() => mission.waypoints, "");
    if (waypoints === undefined || waypoints === null || waypoints === "" || waypoints.length === 0)
      return [{
        'missionIndex': 0,
        'type': 'LAND',
        'altitude': 0,
        'lat': 0,
        'lng': 0
      }];
    return waypoints;
  }
  getSafeActivityDtCreated(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).dt_created, "")
  }
  getSafeActivityMissionID(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).missionID, 0)
  }
  getSafeActivityDtStarted(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).dt_started, "")
  }
  getSafeActivityDtEnded(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).dt_ended, "")
  }
  getSafeActivityState(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).state, 0)
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
      start = parseInt(this.getSafeActivityDtStarted(this.state.activityID), 10);
      var end = parseInt(this.getSafeActivityDtEnded(this.state.activityID), 10);
      return this.getAbsoluteDate(start) + " - " + this.getAbsoluteEndDate(start, end) + " (" + this.getRelativeDate(start) + ", duration: " + this.getDuration(end - start) + ")";
    } else {
      start = parseInt(this.getSafeActivityDtCreated(this.state.activityID), 10);
      return this.getAbsoluteDate(start) + " (" + this.getRelativeDate(start) + ")";

    }
  }

  getMaxBatteryCurrentValue() {
    var value = this.getSafeTelemetryBattery().current
    if (this.getSafeTelemetryBattery().current > this.state.overallMaxBatteryCurrent) {
      this.setState({ overallMaxBatteryCurrent: Math.round(value) + 2 });
      return value;
    } else {
      return this.state.overallMaxBatteryCurrent;
    }

  }

  getLastTelemetryUpdateTimeDiff() {
    var tel = this.getSafeTelemetry();
    var timestamp = 0;
    moment.relativeTimeThreshold('ss', 2);
    moment.updateLocale('de', {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: 'just now',
        ss: '%d seconds',
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      }
    });

    Object.keys(tel).forEach(function (key) {
      if (tel[key].timestamp !== undefined && tel[key].timestamp !== null && tel[key].timestamp > timestamp) {
        timestamp = tel[key].timestamp;
      }
    });
    if (timestamp === 0) {
      if (this.refs.notificationSystem !== null && this.refs.notificationSystem !== undefined && this.thereWasMissingTelemetry === false) {
        this.thereWasAlreadyAMissingTelemetryNotification = moment();
        this.thereWasMissingTelemetry = true;
        this.refs.notificationSystem.addNotification({
          title: (<span data-notify="icon" className="pe-7s-hourglass"></span>), message: (<div>
            So far no telemetry received!
            </div>), level: 'warning', position: "tr", autoDismiss: 5
        });
      }
      return <span style={{ color: "#e59c00", fontSize: "2em", animation: "blinker 1s linear infinite" }}>never</span>;
    }
    var ret = moment(timestamp).fromNow();
    if (ret === "just now ago" || ret === "in just now") {
      if (this.refs.notificationSystem !== null && this.refs.notificationSystem !== undefined && this.thereWasMissingTelemetry) {
        this.thereWasMissingTelemetry = false;
        this.refs.notificationSystem.addNotification({
          title: (<span data-notify="icon" className="pe-7s-like2"></span>), message: (<div>
            Received telemetry!
            </div>), level: 'success', position: "tr", autoDismiss: 10
        });
      }
      this.thereWasAlreadyAMissingTelemetryNotification = moment();
      return <span style={{ color: "#059900", fontSize: "1.5em", animation: "blinker 1s linear infinite" }}>just now</span>;
    } else if (ret === "3 seconds ago" || ret === "4 seconds ago" || ret === "5 seconds ago" || ret === "6 seconds ago" || ret === "7 seconds ago" || ret === "8 seconds ago" || ret === "9 seconds ago") {
      return <div><span style={{ color: "#ffc700", fontSize: "2em", animation: "blinker 1s linear infinite" }}>{ret[0]}</span><br /><span style={{ color: "black", fontSize: "1em" }}>{ret.substring(1)}</span></div>;
    } else {
      if (this.refs.notificationSystem !== null && this.refs.notificationSystem !== undefined && moment(this.thereWasAlreadyAMissingTelemetryNotification).diff() < -15000) {
        this.thereWasAlreadyAMissingTelemetryNotification = moment();
        this.thereWasMissingTelemetry = true;
        this.refs.notificationSystem.addNotification({
          title: (<span data-notify="icon" className="pe-7s-hourglass"></span>), message: (<div>
            No telemetry for {moment(timestamp).fromNow(true)}!
            </div>), level: 'error', position: "tr", autoDismiss: 5
        });
      }
      if (ret.includes("second")) {
        if (ret[1] === "0" || ret[1] === "1" || ret[1] === "2" || ret[1] === "3" || ret[1] === "4" || ret[1] === "5" || ret[1] === "6" || ret[1] === "7" || ret[1] === "8" || ret[1] === "9") {
          return <div ><span style={{ color: "#cc0202", fontSize: "2em", animation: "blinker 1s linear infinite" }}>{ret[0] + ret[1]}</span><br /><span style={{ color: "black", fontSize: "1em" }}>{ret.substring(2)}</span></div>;
        } else {
          return <div ><span style={{ color: "#cc0202", fontSize: "2em", animation: "blinker 1s linear infinite" }}>{ret[0]}</span><br /><span style={{ color: "black", fontSize: "1em" }}>{ret.substring(1)}</span></div>;
        }
      } else {

        return <span style={{ color: "#cc0202", fontSize: "1.5em", animation: "blinker 1s linear infinite" }}>{ret}</span>;
      }
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

  getBatteryGauges() {
    return <div className="text-center">
      <Gauge className="col-lg-4 text-center" value={this.getSafeTelemetryBattery().current} width={100} height={130} min="0" max={this.getMaxBatteryCurrentValue()} label="Current" topLabelStyle={{ fontSize: "1em" }} valueLabelStyle={{ fontSize: "0.8em" }} minMaxLabelStyle={{ fontSize: "0.8em" }} color="#bcce00" />
      <Gauge className="col-lg-4 text-center" value={this.getSafeTelemetryBattery().percentage} width={100} height={130} min="0" max="100" label="Percentage" topLabelStyle={{ fontSize: "1em" }} valueLabelStyle={{ fontSize: "0.8em" }} minMaxLabelStyle={{ fontSize: "0.8em" }} color="#0085e5" />
      <Gauge className="col-lg-4 text-center" value={this.getSafeTelemetryBattery().voltage} width={100} height={130} min="9" max="14" label="Voltage" topLabelStyle={{ fontSize: "1em" }} valueLabelStyle={{ fontSize: "0.8em" }} minMaxLabelStyle={{ fontSize: "0.8em" }} color="#e59c00" />
    </div>;
  }

  getStyledTelemetryLoss() {
    var value = this.getSafeTelemetryHeartbeat().messagesLost;
    if (value < 1) {
      return <span style={{ color: "#059900", fontSize: "2em" }}>{value}</span>
    } else if (value < 3) {
      return <span style={{ color: "#cc0202", fontSize: "2em" }}>{value}</span>
    } else {
      return <span style={{ color: "#cc0202", fontSize: "2em" }}>{value}</span>
    }
  }

  getDroneConnectorValues() {
    return <div className="row">
      <div className="col-lg-4 text-center">
        <Gauge value={this.getSafeTelemetryHeartbeat().cpuTemp} width={100} height={130} min="0" max="90" label="CPU °C" topLabelStyle={{ fontSize: "1em" }} valueLabelStyle={{ fontSize: "0.8em" }} minMaxLabelStyle={{ fontSize: "0.8em" }} color="#e5004c" />
      </div>
      <div className="col-lg-4 text-center" style={{ minWidth: "140px" }}>
        <span>Telemetry loss</span>
        <div style={{ height: "50px" }}></div>
        {this.getStyledTelemetryLoss()}
      </div>
      <div className="col-lg-4 text-center" style={{ minWidth: "140px" }}>
        <span>Last Update</span>
        <div style={{ height: "50px" }}></div>
        {this.getLastTelemetryUpdateTimeDiff()}
      </div>
    </div>;
  }

  getNormalActivity() {
    return <Grid fluid>
      <Row>
        <Col md={8}>
          <Card title={this.getActivityTitle(this.state.activityID)} category={<span>{this.getDate()}<br />{this.getState()}</span>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
            <div style={{ height: "60%" }}>
              <Maps
                latitude={this.getSafeWaypoints()[0].lat}
                longitude={this.getSafeWaypoints()[0].lng}
                route={this.getSafeWaypoints()}
                historyTelemetryPositions={JSON.parse(JSON.stringify(this.getSafeHistoryTelemetryPositions()))}
              />
            </div>

          } />
          {/* <Col md={4}>
            <Card title="Battery Usage" category={0} stats="~ 12 % per hour" statsIcon="fa fa-clock-o" content={<div><BatteryUsage activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Col>
          <Col md={4}>
            <Card title="Notifications" category={this.getSafeDroneName(this.props.activity.activities[this.props.activity.activities.length - 1].droneID)} stats={moment(this.props.activity.activities[this.props.activity.activities.length - 1].dt_created * 1000).fromNow()} statsIcon="fa fa-clock-o" content={<div><ActivitySummary activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Col> */}
          <Col md={12}>
            <Card title="Altitude Profile" category="relative altitudes in meter" content={<AltitudeProfile missionToShow={this.getMissionByID(this.getSafeActivityMissionID(this.state.activityID))} />} />
          </Col>
        </Col>
        <Col md={4}>
          <Row>
            <Card title="Activity summary" content={<div><ActivitySummary showName={false} showMap={false} activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Row>
          <Row>
            <Card title={this.getSafeDroneName(this.getSafeDroneID(this.getActivityByID(this.state.activityID)))} category={this.getSafeDroneVehicleType(this.getSafeDroneID(this.getActivityByID(this.state.activityID)))} content={
              <DroneSmall droneToShow={this.getSafeDrone(this.getSafeDroneID(this.getActivityByID(this.state.activityID)))} />
            } />
          </Row>
          {/* <Row>
            <Card title="Payload" category={this.getSafeDroneName(this.props.activity.activities[this.props.activity.activities.length - 1].droneID)} stats={moment(this.props.activity.activities[this.props.activity.activities.length - 1].dt_created * 1000).fromNow()} statsIcon="fa fa-clock-o" content={<div><ActivitySummary activityToShow={this.getActivityByID(this.state.activityID)} /></div>} />
          </Row> */}
        </Col>
      </Row>

    </Grid>
  }

  getLiveActivity() {
    return <Grid fluid>
      <NotificationSystem ref="notificationSystem" style={style} />
      <Row>
        <Col lg={7}>
          <Card title={this.getLiveActivityTitle(this.state.activityID)} category={<span>{this.getDate()}<br />{this.getState()}</span>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
            <div style={{ height: "50%" }}>
              <Maps
                longitude={this.getSafeTelemetryPosition().longitude}
                latitude={this.getSafeTelemetryPosition().latitude}
                route={this.getSafeWaypoints()}
                currentWaypoint={this.getSafeTelemetryMissionState().currentItem}
                telemetryPath={JSON.parse(JSON.stringify(this.getSafeTelemetryRoute()))}
                historyTelemetryPositions={JSON.parse(JSON.stringify(this.getSafeHistoryTelemetryPositions()))}

              />
            </div>

          } />
          {/* <Col lg={2}>
            <TurnCoordinator showBox={false} size={100} turn={this.getSafeTelemetryAttitude().roll} />
          </Col> */}
          <Col md={6}>
            <Card title="Drone Connector" content={this.getDroneConnectorValues()} />
          </Col>
          <Col md={6}>
            <Card title="Battery Overview" content={this.getBatteryGauges()} />
          </Col>
          {/* <Col md={4}>
            <Card title="flight statistics" content={<div>Content here!</div>} />
          </Col>
          <Col md={4}>
            <Card title="notifications" content={<div>Notifications goes here</div>} />
          </Col>
          <Col md={4}>
            <Card title="payload" content={<div>Payload goes here</div>} />
          </Col> */}
        </Col>
        <Col lg={5}>
          <Col lg={12} >
            <div>
              <img alt="onboard-camera" src={"data:image/jpg;base64, " + this.getSafeTelemetryCameraImage().img} style={{ verticalAlign: "top", paddingTop: "45px" }}></img>
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
