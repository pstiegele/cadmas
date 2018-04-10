import React, {Component} from 'react';
import ChartistGraph from 'react-chartist';
import {Grid, Row, Col} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';
import {ActivitiesSmall} from 'components/ActivitiesSmall/ActivitiesSmall.jsx';
import LastFlight from 'components/LastFlight/LastFlight.jsx';
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from 'variables/Variables.jsx';

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i}></i>);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (<div className="content">
      <Grid fluid="fluid">
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className = "pe-7s-server text-warning" > </i>} statsText="Data usage this month" statsValue="35GB" statsIcon={<i className = "fa fa-refresh" > </i>} statsIconText="Updated now"/>
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className = "pe-7s-world text-success" > </i>} statsText="Number of missions" statsValue="27" statsIcon={<i className = "fa fa-calendar-o" > </i>} statsIconText="last 30 days"/>
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className = "fa  fa-exclamation-circle text-danger" > </i>} statsText="Errors" statsValue="2" statsIcon={<i className = "fa fa-clock-o" > </i>} statsIconText="on the last mission"/>
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard bigIcon={<i className = "fa fa-plane text-info" > </i>} statsText="Distance traveled" statsValue="45 km" statsIcon={<i className = "fa fa-refresh" > </i>} statsIconText="Updated now"/>
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
            <Card title="Last flight" category="Skywalker X-8" stats="10 min ago" statsIcon="fa fa-clock-o" content={<div><LastFlight/></div>}/>
          </Col>
          <Col md={6}>
            <Card title="Activities" category="The latest activities of all drones" stats="31 missions" statsIcon="fa fa-plane" content={<div className = "table-full-width" > <table className="table">
                <ActivitiesSmall/>
              </table>
            </div>}/>
          </Col>
          <Col md={3}>
            <Card id="chartActivity" title="Overall flights" category="All flights of all drones of the last year" stats="176 flights" statsIcon="fa fa-check" content={<div className = "ct-chart" > <ChartistGraph data={dataBar} type="Bar" options={optionsBar} responsiveOptions={responsiveBar}/>
            </div>} legend={<div className = "legend" > {
                this.createLegend(legendBar)
              }
              </div>
}/>
          </Col>
        </Row>

      </Grid>
    </div>);
  }
}

export default Dashboard;
