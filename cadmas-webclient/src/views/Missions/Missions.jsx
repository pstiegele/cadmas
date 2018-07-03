import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';


import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import CreateMissionButton from '../../elements/CreateMissionButton/CreateMissionButton';
//import util from 'util';




const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity };
};

class Missions extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, redirectToMission: 0 };
  }

  thArray = [
    "",
    "date",
    "name",
    "location",
    "waypoints",
    "distance",
    "usage",
    "set to"
  ];

  getRelativeOrAbsoluteDate(date) {
    if (new Date() - new Date(date * 1000) < 604800000) {
      return moment(date * 1000).fromNow();
    } else {
      return moment(date * 1000).locale("de", localization).format("LL")
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

  getUsage(missionID) {
    var counter = 0;
    for(var i=0;i<this.props.activity.activities.length;i++){
      if (this.props.activity.activities[i].missionID === missionID) {
        counter++
      }
    }
    if(counter===1){
      return counter + " time";
    }else{
      return counter + " times";
    }
  }

  getSetTo(missionID){
    var res=[]
    // for(var i=0;i<this.props.drone.drones.length;i++){
    //   if(this.props.drone.drones[i].activeMission===missionID){
    //     res.push(this.props.drone.drones[i].name);
    //   }
    // }
    return res;
  }

  getLocation(missionID){
    return "Würzburg";
  }

  getNumberOfWaypoints(missionID){
    var counter = 3;
    if(counter===1){
      return counter + " item";
    }else{
      return counter + " items";
    }
    
  }

  handleClick(that) {
    this.setState({ redirect: true, redirectToMission: that._targetInst.return.key });
  }

  getMissionsTitle(){
    var button = <span className="pull-right"><CreateMissionButton /> </span>
    return <div>Missions {button}</div>
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/mission/" + this.state.redirectToMission} />;
    }
    return (<div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card title={this.getMissionsTitle()} category="That are your missions" ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={<Table striped hover ><thead>
              <tr>
                {
                  this.thArray.map((prop, key) => {
                    return (<th key={key}>{prop}</th>);
                  })
                }
              </tr>
            </thead>
              <tbody>
                {
                  this.props.mission.missions.slice(0).reverse().map((prop, key) => {

                    return (<tr key={prop.missionID} onClick={this.handleClick.bind(this)}>

                      <td key={prop.missionID + "-icon"}>
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                          <i className="fa fa-fighter-jet"></i>
                        </NavLink>
                      </td>
                      <td key={prop.missionID + "-date"}>{this.getRelativeOrAbsoluteDate(prop.dt_created)}</td>
                      <td key={prop.missionID + "-name"}>{prop.name}</td>
                      <td key={prop.missionID + "-location"}>{this.getLocation(prop.missionID)}</td>
                      <td key={prop.missionID + "-waypoints"}>{this.getNumberOfWaypoints(prop.missionID)}</td>
                      <td key={prop.missionID + "-distance"}>{"12 km"}</td>
                      <td key={prop.missionID + "-usage"}>{this.getUsage(prop.missionID)}</td>
                      <td key={prop.missionID + "-setto"}>{this.getSetTo(prop.missionID)}</td>
                    </tr>)
                  })
                }
              </tbody>
            </Table>} />
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}
export default connect(mapStateToProps)(Missions);
