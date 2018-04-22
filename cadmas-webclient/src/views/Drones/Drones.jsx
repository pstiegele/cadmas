import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import droneImage from "assets/img/drone.png";
import copterImage from "assets/img/hexacopter.png";
import ActivitiesSmall from 'components/ActivitiesSmall/ActivitiesSmall.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';


class Drones extends Component {

  render() {
    return (
      <div className="content">
        <Grid fluid="fluid">
          <Row>
            <Col md={6}>
              <Card title="Skywalker X-8" category="Airplane" stats="last flight: 2d ago" statsIcon="fa fa-clock-o" content={
                <div>
                <div className="row">
                  <div className="col-lg-4"><img width="180px" src={droneImage} alt="..." /></div>
                  <div className="col-lg-7"><div className = "table-full-width" > <table className="table">
                <ActivitiesSmall filterDrone={true}/>
              </table>
            </div></div>
                </div>
                <div className="row">
                {/* <div className="col-lg-10 h5">Statistics<br />5.4 GB data usage this month</div> */}
                  <div className="col-lg-12 text-right">
                    <Button className="pt-1" bsStyle="warning" type="button" bsSize="small" pullRight fill >
                      Remove Drone
                    </Button>
                  </div>
                </div>
                </div>
                } />
            </Col>
            <Col md={6}>
              <Card title="Pathfinder Hexacopter" category="Quadcopter" stats="last flight: 7d ago" statsIcon="fa fa-clock-o" content={
               <div>
               <div className="row">
                 <div className="col-lg-4"><img width="180px" src={copterImage} alt="..." /></div>
                 <div className="col-lg-7"><div className = "table-full-width" > <table className="table">
               <ActivitiesSmall filterDrone={true}/>
             </table>
           </div></div>
               </div>
               <div className="row">
               {/* <div className="col-lg-10 h5">Statistics<br />5.4 GB data usage this month</div> */}
                 <div className="col-lg-12 text-right">
                   <Button className="pt-1" bsStyle="warning" type="button" bsSize="small" pullRight fill >
                     Remove Drone
                   </Button>
                 </div>
               </div>
               </div>
              } />
            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}

export default Drones;
