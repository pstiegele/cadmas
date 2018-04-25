import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import ActivitiesSmall from 'components/ActivitiesSmall/ActivitiesSmall.jsx';
import LastFlight from 'components/LastFlight/LastFlight.jsx';
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone, activity: state.activity };
};

class Dashboard extends Component {

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle";
      legend.push(<i className={type} style={{color: json["types"][i]}} key={i}></i>);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  getNumberOfMissions() {
    var counter = 0;

    this.props.mission.missions.forEach(element => {
      if (Date.now() - new Date(element.dt_created * 1000) < 2592000000) {
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
    // console.log("props: "+JSON.stringify(this.props));

    // var mytest = []
    // mytest[3] = [];
    // mytest[3][3] = 4;
    // console.log("mytest: " + JSON.stringify(mytest));

//console.log("drones: "+JSON.stringify(this.props.drone.drones));
    var i = 0;
    var drones = [];
    this.props.drone.drones.forEach(thisDrone => {
     // console.log("drone: "+thisDrone.name);
      activities[i] = [];
      drones[thisDrone.droneID]=i;
      i++;
    });
console.log("drones: "+JSON.stringify(drones));

    this.props.activity.activities.forEach(thisActivity => {
      var date = new Date(thisActivity.dt_created * 1000);
      console.log("activity date: "+date);
      if (new Date() - date < 31536000000) {
        if (activities[drones[thisActivity.droneID]]===undefined){
          activities[drones[thisActivity.droneID]]=[];
        }
        if (activities[drones[thisActivity.droneID]][date.getMonth()] === undefined) {
          activities[drones[thisActivity.droneID]][date.getMonth()] = 0;
        }
        activities[drones[thisActivity.droneID]][date.getMonth()]++;
      }

    });
    console.log("activities: " + JSON.stringify(activities));

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
    
    var names = [];
    var types = [];
    var i = 0;
    this.props.drone.drones.forEach(thisDrone =>{
      names[i]=thisDrone.name;
      types[i]="new-blue"
      i++;
    });
    console.log("types: "+JSON.stringify(types));
    
    return {
      names: names,
      types: types
    };
  }
  

  render() {
    return (<div className="content">
      <Grid fluid>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="pe-7s-server text-warning" > </i>} statsText="Data usage this month" statsValue="35GB" statsIcon={<i className="fa fa-refresh" > </i>} statsIconText="Updated now" />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="pe-7s-world text-success" > </i>} statsText="Number of missions" statsValue={this.getNumberOfMissions()} statsIcon={<i className="fa fa-calendar-o" > </i>} statsIconText="last 30 days" />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="fa  fa-exclamation-circle text-danger" > </i>} statsText="Errors" statsValue="2" statsIcon={<i className="fa fa-clock-o" > </i>} statsIconText="on the last mission" />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className="fa fa-plane text-info" > </i>} statsText="Distance traveled" statsValue="45 km" statsIcon={<i className="fa fa-refresh" > </i>} statsIconText="Updated now" />
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
          <Col md={3}>
            <Card title="Last flight" category="Skywalker X-8" stats="10 min ago" statsIcon="fa fa-clock-o" content={<div><LastFlight /></div>} />
          </Col>
          <Col md={5}>
            <Card title="Activities" category="The latest activities of all drones" stats="31 missions" statsIcon="fa fa-plane" content={<div className="table-full-width" > <table className="table">
              <ActivitiesSmall />
            </table>
            </div>} />
          </Col>
          <Col md={4}>
            <Card id="chartActivity" title="Overall flights" category="All flights of all drones of the last year" stats="176 flights" statsIcon="fa fa-check" content={<div className="ct-chart" > <ChartistGraph data={this.getChartData()} type="Bar" options={this.getChartOptionsBar()} responsiveOptions={this.getChartResponsiveBar()} />
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
