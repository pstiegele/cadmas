import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';


import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import Maps from '../Maps/Maps';

//import util from 'util';




const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity };
};

class Activity extends Component {
  constructor(props){
    super(props);
    this.state = {activityID: parseInt(this.props.match.params.activityID, 10)};
    
  }

  
  getRelativeOrAbsoluteDate(date) {
    if (new Date() - new Date(date * 1000) < 604800000) {
      return moment(date * 1000).fromNow();
    } else {
      return moment(date * 1000).locale("de", localization).format("LLL");
    }
  }
  getAbsoluteDate(date){
    return moment(date * 1000).locale("de", localization).format("LLL");
  }
  getRelativeDate(date){
    return moment(date * 1000).fromNow();
  }
  getAbsoluteEndDate(start,end){
    if(moment.duration((end-start)*1000).asDays()>1){
      return moment(end*1000).format("LLL");
    }else{
      return moment(end*1000).format("LT");
    }
  }
  getDuration(duration){
    console.log("du: "+duration);
    if(moment.duration(duration*1000).asMinutes()>60){
      if(moment.duration(duration*1000).asHours()>24){
        return Math.round(moment.duration(duration*1000).asDays())+" days";
      }else{
        return Math.round(moment.duration(duration*1000).asHours())+" hours";
      }
    }else{
      return Math.round(moment.duration(duration*1000).asMinutes())+" min";
    }
    
  }

  getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  getSafeDroneName(droneID) {
    return this.getSafe(() => this.getDroneByID(droneID).name, "")
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
    console.log("called "+JSON.stringify(this.props.activity));
    
    var result = this.props.activity.activities.filter(function (obj) {
      return obj.activityID === activityID;
    });
    return result[0];
  }

  handleClick(that){
    this.setState({redirect: true, redirectToActivity: that._targetInst.return.key});
  }

getDate(){
  var start = parseInt(this.getSafeActivityDtCreated(this.state.activityID),10);
  var end = parseInt(this.getSafeActivityDtEnded(this.state.activityID),10);
  console.log("end: "+end);
  console.log("start: "+start);
  return this.getAbsoluteDate(start)+" - "+this.getAbsoluteEndDate(start,end)+" ("+this.getRelativeDate(start)+", duration: "+this.getDuration(end-start)+")";
}

getState(){
  var state = parseInt(this.getSafeActivityState(this.state.activityID),10);
  switch (state) {
    case 0:
    return <div><i className="fa fa-circle" style={{ color: "grey"}} key={"activityStatus"}></i>{" activity has not started yet."}</div>;
    
  
    case 1:
      return <div><i className="fa fa-circle" style={{ color: "red"}} key={"activityStatus"}></i>{" activity is currently live"}</div>;
      
  
    case 2:
    return <div><i className="fa fa-circle" style={{ color: "green"}} key={"activityStatus"}></i>{" activity was successfully completed"}</div>;
   
  
    default:
      break;
  }
}

  render() { 
    return (<div className="content">
      <Grid fluid>
        <Row>
          <Col md={8}>
            <Card title={this.getSafeActivityName(this.state.activityID)} category={<div>{this.getDate()}<br />{this.getState()}</div>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
              <Maps />
            } />
          </Col>
          <Col md={4}></Col>
        </Row>
      </Grid>
    </div>);
  }
}
export default connect(mapStateToProps)(Activity);
