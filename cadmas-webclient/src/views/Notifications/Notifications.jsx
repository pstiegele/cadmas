import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import localization from 'moment/locale/de';
import CustomCheckbox from 'elements/CustomCheckbox/CustomCheckbox';
import ChartistGraph from 'react-chartist';





const mapStateToProps = (state) => {
  return { notification: state.notification, drone: state.drone, activity: state.activity };
};

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, redirectToNotification: 0 };
  }
  thArray = [
    "",
    "date",
    "title",
    "drone",
    "activity",
    "delete"
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
  getSafeDroneNameByActivity(activityID) {
    var droneID = this.getSafe(() => this.getActivityByID(activityID).droneID, "");
    return this.getSafe(() => this.getDroneByID(droneID).name, "");
  }
  getSafeDroneIDByActivity(activityID){
   return this.getSafe(() => this.getActivityByID(activityID).droneID, "");
  }
  getDroneByID(droneID) {
    var result = this.props.drone.drones.filter(function (obj) {
      return obj.droneID === droneID;
    });
    return result[0];
  }

  getSafeActivityName(activityID) {
    return this.getSafe(() => this.getActivityByID(activityID).name, "")
  }
  getActivityByID(activityID) {
    var result = this.props.activity.activities.filter(function (obj) {
      return obj.activityID === activityID;
    });
    return result[0];
  }

  getNotificationType(type) {
    switch (type) {
      case 0:
        return <i className="fa fa-info" style={{ color: "#006400" }}></i>;
      case 1:
        return <i className="fa fa-exclamation" style={{ color: "#B8860B" }}></i>;
      case 2:
        return <i className="fa fa-bolt" style={{ color: "#DC143C" }}></i>;

      default:
        return "info";
    }
  }
  getPieData() {
    var count = [];
    var sum = 0;
    for(var i = 0;i<this.props.drone.drones.length;i++){      
      for(var j=0;j<this.props.notification.notifications.length-1;j++){
        if(this.getSafeDroneIDByActivity(this.props.notification.notifications[j].activityID)===this.props.drone.drones[i].droneID){
          if(count[i]===undefined){
            count[i]=0;
          }
          count[i]++;
          sum++;
        }
      }
    }
    var percentage=[];
    for (let i = 0; i < count.length; i++) {
    percentage[i] = (count[i]/sum)*100;
    }
    var percentageLabels = percentage.slice(0);
    for (let i = 0; i < percentageLabels.length; i++) {
      percentageLabels[i]=Math.round(percentageLabels[i])+" %";
    }
   
    return {
      labels: percentageLabels,
      series: percentage
    };
  }
  getPieLegend() {
    var legendData = this.getPieLegendData();
    var legend = [];
    for (var i = 0; i < legendData["names"].length; i++) {
      var type = "fa fa-circle";
      legend.push(<i className={type} style={{ color: legendData["types"][i] }} key={i}></i>);
      legend.push(" ");
      legend.push(legendData["names"][i]);
    }
    return legend;
  }
  getPieLegendData() {
    var drones = [];
    var colors = [];
    for(var i = 0;i<this.props.drone.drones.length;i++){
    drones[i]=this.props.drone.drones[i].name;
    colors[i]=this.props.drone.drones[i].color;
    }
    return {
      names: drones,
      types: colors
    };
  }


  getErrorAmount() {
    var amount = this.props.notification.notifications.length;
    return "total: " + amount + " errors";
  }

  handleClick(that) {
    this.setState({ redirect: true, redirectToNotification: that._targetInst.return.key });
  }

  handleDeleteClick(event){
    alert("this function is currently not supported");
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/notification/" + this.state.redirectToNotification} />;
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title="Notifications" category="That are your latest notifications" ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
                <Table striped hover ><thead>
                  <tr>
                    {
                      this.thArray.map((prop, key) => {
                        return (<th key={prop+"-th"}>{prop}</th>);
                      })
                    }
                  </tr>
                </thead>
                  <tbody>
                    {
                      this.props.notification.notifications.slice(0).reverse().map((prop, key) => {

                        return (<tr key={prop.notificationID} onClick={this.handleClick.bind(this)}>

                          <td key={prop.notificationID + "-icon"}>
                            <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                              {this.getNotificationType(prop.type)}
                            </NavLink>
                          </td>
                          <td key={prop.notificationID + "-date"}>{this.getRelativeOrAbsoluteDate(prop.dt_occured)}</td>
                          <td key={prop.notificationID + "-title"}>{prop.title}</td>
                          <td key={prop.notificationID + "-drone"}>{this.getSafeDroneNameByActivity(prop.activityID)}</td>
                          <td key={prop.notificationID + "-activity"}>{this.getSafeActivityName(prop.activityID)}</td>
                          <td key={prop.notificationID + "-delete"} onClick={this.handleDeleteClick}>
                              <i className="fa fa-trash" style={{ color: "#DC143C" }}></i>
                          </td>

                        </tr>)
                      })
                    }
                  </tbody>
                </Table>
              } />
            </Col>
            <Col md={4}>
              <Row>
                {/* <Card title="Filter" category="filter your notifications by drone" ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
                  <div className="content">
                    {this.props.drone.drones.map((prop, key) => {
                      return <div key={prop.droneID+"-droneID"}><CustomCheckbox isChecked={true} number={key} label={prop.name} inline={false} /></div>;
                    })
                    }
                  </div>
                } /> */}
              </Row>
              <Row>
                {/* <Card statsIcon="fa fa-times" title="Errors per drone" category="overall" stats={this.getErrorAmount()} content={<div id="chartPreferences" className="ct-chart ct-perfect-fourth" > <ChartistGraph data={this.getPieData()} type="Pie" />
                </div>} legend={<div className="legend" > {
                  this.getPieLegend()
                }
                </div>
                } /> */}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Notifications);
