import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';


import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
//import util from 'util';




const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity };
};

class Activities extends Component {
  constructor(props){
    super(props);
    this.state = {redirect: false,redirectToActivity:0};
  }

  thArray = [
    "",
    "date",
    "name",
    "distance",
    "duration",
    "drone",
    "mission name",
    "download"
  ];

  getRelativeOrAbsoluteDate(date) {
    if (new Date() - new Date(date * 1000) < 604800000) {
      return moment(date * 1000).fromNow();
    } else {
      return moment(date * 1000).locale("de", localization).format("LL")
    }
  }
  getDuration(duration){
    if(moment.duration(duration,"minutes").asMinutes()>60){
      if(moment.duration(duration,"minutes").asHours()>24){
        return Math.round(moment.duration(duration,"minutes").asDays())+" days";
      }else{
        return Math.round(moment.duration(duration,"minutes").asHours())+" hours";
      }
    }else{
      return Math.round(moment.duration(duration,"minutes").asMinutes())+" min";
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

  handleClick(that){
    this.setState({redirect: true, redirectToActivity: that._targetInst.return.key});
  }
  

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/activity/"+this.state.redirectToActivity} />;
    }  
    return (<div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card title="Activities" category="That are your latest flight activities" ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={<Table striped hover ><thead>
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
                  this.props.activity.activities.slice(0).reverse().map((prop, key) => {

                    return (<tr key={prop.activityID} onClick={this.handleClick.bind(this)}>

                      <td key={prop.activityID + "-icon"}>
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                          <i className="fa fa-fighter-jet"></i>
                        </NavLink>
                      </td>
                      <td key={prop.activityID + "-date"}>{this.getRelativeOrAbsoluteDate(prop.dt_created)}</td>
                      <td key={prop.activityID + "-name"}>{prop.name}</td>
                      <td key={prop.activityID + "-distance"}>{"12 km"}</td>
                      <td key={prop.activityID + "-duration"}>{this.getDuration(prop.duration)}</td>
                      <td key={prop.activityID + "-drone"}>{this.getSafeDroneName(prop.droneID)}</td>
                      <td key={prop.activityID + "-mission"}>{this.getSafeMissionName(prop.missionID)}</td>
                      <td key={prop.activityID + "-download"}>
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                          <i className="fa fa-cloud-download"></i>
                        </NavLink>
                      </td>

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
export default connect(mapStateToProps)(Activities);
