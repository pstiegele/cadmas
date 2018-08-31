import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import ActivitiesSmall from 'components/ActivitiesSmall/ActivitiesSmall.jsx';
import ActivitySummary from 'components/ActivitySummary/ActivitySummary.jsx';
import { connect } from "react-redux";
import moment from 'moment';



const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, notification: state.notification, activity: state.activity, user: state.user };
};

class Dashboard extends Component {


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
  getSafeLatestActivity(){
    var a = this.getSafe(() => this.props.activity.activities[this.props.activity.activities.length-1], null);
    if(a!==null&&a!==undefined){
      return a;
    }else{
      return this.props.activity.activities[0];
    }
  }
  getSafeActivityName(activity){
    return this.getSafe(() => activity.name,"");
  }
  getDroneByID(droneID) {
    var result = this.props.drone.drones.filter(function (obj) {
      return obj.droneID === droneID;
    });
    return result[0];
  }
  

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle";
      legend.push(<i className={type} style={{ color: json["types"][i] }} key={i}></i>);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  getNumberOfActivitiesThisMonth() {
    var counter = 0;

    this.props.activity.activities.forEach(element => {
      if (Date.now() - new Date(element.dt_created * 1000) < 2592000000) {
        counter++;
      }
    });
    return counter;
  }
  getNumberOfActivitiesThisYear(){
    var counter = 0;

    this.props.activity.activities.forEach(element => {
      if (Date.now() - new Date(element.dt_created * 1000) < 31536000000) {
        counter++;
      }
    });
    return counter;
  }
  getChartData() {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var activities = [];
   
    var i = 0;
    var drones = [];
    this.props.drone.drones.forEach(thisDrone => {
      activities[i] = [];
      drones[thisDrone.droneID] = i;
      i++;
    });

    this.props.activity.activities.forEach(thisActivity => {
      var date = new Date(thisActivity.dt_created * 1000);
      if (new Date() - date < 31536000000) {
        if (activities[drones[thisActivity.droneID]] === undefined) {
          activities[drones[thisActivity.droneID]] = [];
        }
        if (activities[drones[thisActivity.droneID]][date.getMonth()] === undefined) {
          activities[drones[thisActivity.droneID]][date.getMonth()] = 0;
        }
        activities[drones[thisActivity.droneID]][date.getMonth()]++;
      }

    });

    return {
      labels: months,
      series: activities
    };
  }

  getChartOptionsBar() {
    return {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: "245px"
    };
  }
  getChartResponsiveBar() {
    return [
      [
        'screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }
      ]
    ];
  }
  getChartLegendBar() {
    var colors = ["#1DC7EA", "#FB404B", "#FFA534", "#9368E9", "#87CB16", "#1b8dff", "#5e5e5e", "#dd4b39", "#35465c", "#e52d27", "#55acee", "#cc2127", "#1769ff", "#6188e2", "#a748ca"];
    var names = [];
    var types = [];
    var i = 0;
    this.props.drone.drones.forEach(thisDrone => {
      names[i] = thisDrone.name;
      types[i] = colors[i];
      i++;
    });

    return {
      names: names,
      types: types
    };
  }

  getNumberOfCameraImagesThisMonth(){
    return this.getSafe(() => this.props.user.cameraImagesLast30Days.toLocaleString('de'), 0);
  }
  getNumberOfNotifications() {
    if (this.getSafeLatestActivity() != null) {
      var not = this.props.notification.notifications.filter(notification => notification.activityID === this.props.activity.activities[this.props.activity.activities.length-1].activityID);
      return not.length;
    }
    return 0;
  }

  getOverallDistance(){
    if(this.props.user!=null&&this.props.user.overallDistance!=null){
      return (this.props.user.overallDistance/1000.0).toFixed(0)+" km";
    }else{
      return 0;
    }
  }

  render() {
    return (<div className="content">
      <Grid fluid>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="pe-7s-camera text-warning" > </i>} statsText="Camera images" statsValue={this.getNumberOfCameraImagesThisMonth()} statsIcon={<i className="fa fa-calendar" > </i>} statsIconText="last 30 days" />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="pe-7s-world text-success" > </i>} statsText="Activities this month" statsValue={this.getNumberOfActivitiesThisMonth()} statsIcon={<i className="fa fa-calendar" > </i>} statsIconText="last 30 days" />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="fa  fa-exclamation text-danger" > </i>} statsText="Notifications" statsValue={this.getNumberOfNotifications()} statsIcon={<i className="fa fa-compass" > </i>} statsIconText={"on: "+this.getSafeActivityName(this.getSafeLatestActivity())} />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="fa fa-plane text-info" > </i>} statsText="Distance traveled" statsValue={this.getOverallDistance()} statsIcon={<i className="fa fa-refresh" > </i>} statsIconText="Updated now" />
          </Col>
        </Row>
        <Row>
          {/* <Col md={8}>
            <Card statsIcon="fa fa-history" id="chartHours" title="Users Behavior" category="24 Hours performance" stats="Updated 3 minutes ago" content={<div className = "ct-chart" > <ChartistGraph data={dataSales} type="Line" options={optionsSales} responsiveOptions={responsiveSales}/>
            </div>} legend={<div className = "legend" > {
              this.createLegend(legendSales)
            }
            </div>
            }/>
            </Col> */
          }
          {/* <Col md={4}>
            <Card statsIcon="fa fa-clock-o" title="Email Statistics" category="Last Campaign Performance" stats="Campaign sent 2 days ago" content={<div id = "chartPreferences" className = "ct-chart ct-perfect-fourth" > <ChartistGraph data={dataPie} type="Pie"/>
            </div>} legend={<div className = "legend" > {
              this.createLegend(legendPie)
            }
            </div>
            }/>
            </Col> */
          }
        </Row>

        <Row>
          <Col md={4}>
            <Card title="Latest Activity" category="a short summary" content={<div><ActivitySummary showMap={true} showSeeMoreButton={true} showActivityName={true} activityToShow={this.getSafeLatestActivity()}/></div>} />
          </Col>
          <Col md={5}>
            <Card title="Activities" category="The latest activities of all drones" stats={this.props.activity.activities.length+" activities overall"} statsIcon="fa fa-plane" content={<div className="table-full-width" > <table className="table">
              <ActivitiesSmall />
            </table>
            </div>} />
          </Col>
          <Col md={3}>
            <Card id="chartActivity" title="Overall Activities" category="All activities of all drones of the last year" stats={Math.round(this.getNumberOfActivitiesThisYear()/12)+" activities per month"} statsIcon="fa fa-balance-scale" content={<div className="ct-chart" > <ChartistGraph data={this.getChartData()} type="Bar" options={this.getChartOptionsBar()} responsiveOptions={this.getChartResponsiveBar()} />
            </div>} legend={<div className="legend" > {
              this.createLegend(this.getChartLegendBar())
            }
            </div>
            } />
          </Col>
        </Row>

      </Grid>
    </div>);
  }
}

export default connect(mapStateToProps)(Dashboard);
