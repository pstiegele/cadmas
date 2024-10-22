import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

//import ActivitySummary from 'components/ActivitySummary/ActivitySummary';
import MissionSummary from 'components/MissionSummary/MissionSummary';
import AltitudeProfile from 'components/AltitudeProfile/AltitudeProfile';
import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de';
import Maps from '../Maps/Maps';
import CadmasWS from 'websocket/CadmasWS';
import MissionTitleControlButtons from 'elements/MissionTitleControlButtons/MissionTitleControlButtons.jsx';


//import util from 'util';




const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity };
};

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = { missionID: parseInt(this.props.match.params.missionID, 10) };
    //this.handleSeeMoreClick = this.handleSeeMoreClick.bind(this);
    CadmasWS.getFullMission(this.state.missionID);
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
  getMissionTitle(missionID) {
    var res;
    var name = this.getSafeMissionName(missionID);
    var controlButtons = <span className="pull-right">
      <MissionTitleControlButtons missionID={this.state.missionID} drones={this.props.drone.drones} /></span>
    res = <div>{name}{controlButtons}</div>
    return res;
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
  // handleSeeMoreClick() {
  //   CadmasWS.addActivity(7, 2, "Activity from Mission", 1, "this is a note", "2017-09-18 16:52:55", "2017-09-18 18:52:55");
  // }

  getSafeWaypoints() {
    var mission = this.getMissionByID(this.state.missionID);
    if (mission === undefined || mission === "" || mission === null)
      return [{
        'missionIndex': 0,
        'type': 'START',
        'altitude': 0,
        'lat': 0,
        'lng': 0
      }];
    var waypoints = this.getSafe(() => mission.waypoints, "");
    if (waypoints === undefined || waypoints === null || waypoints === "")
      return [{
        'missionIndex': 0,
        'type': 'START',
        'altitude': 0,
        'lat': 0,
        'lng': 0
      }];
    return waypoints;
  }

  getSafeStartWaypoint() {
    var waypoints = this.getSafeWaypoints();
    if (waypoints === undefined || waypoints === null || waypoints === "" || waypoints[0] === undefined || waypoints[0] === null || waypoints[0] === "")
      return {
        'missionIndex': 0,
        'type': 'START',
        'altitude': 0,
        'lat': 0,
        'lng': 0
      };
    return waypoints[0];

  }

  render() {
    return (<div className="content">
      <Grid fluid>
        <Row>
          <Col md={8}>
            <Card title={this.getMissionTitle(this.state.missionID)} category={"Mission"} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
              <div style={{ height: "60%" }}>
                <Maps
                  route={this.getSafeWaypoints()}
                />
              </div>

            } />
          </Col>
          <Col lg={4}>
            <Row>
              <Card title="Mission summary" content={<div><MissionSummary missionToShow={this.getMissionByID(this.state.missionID)} /></div>} />
            </Row>
            <Row>
              <Card title="Altitude Profile" category="relative altitudes in meter" content={<AltitudeProfile missionToShow={this.getMissionByID(this.state.missionID)}  />} />
            </Row>

          </Col>

          {/* <Row>
              <Card title="Mission is set to" category="2 drones" content={
                <div>
                  <SetMissionToDrone missionToSet={this.state.missionID} />
                </div>
              } />
            </Row> */}
          {/* <Row>
              <Card title="Start Mission" category="on Skywalker X-8" content={
                <div>
                  <Button className="pt-1" bsStyle="danger" type="button" bsSize="small" pullRight={true} fill={true} onClick={() => this.handleSeeMoreClick()}>
            Start
          </Button>
                </div>
              } />
            </Row> */}


        </Row>

      </Grid>
    </div>);
  }
}
export default connect(mapStateToProps)(Activity);
