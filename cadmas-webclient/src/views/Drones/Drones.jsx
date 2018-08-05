import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import ActivitiesSmall from 'components/ActivitiesSmall/ActivitiesSmall.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { connect } from "react-redux";
import moment from "moment";
import DroneSmall from 'components/DroneSmall/DroneSmall';


const mapStateToProps = (state) => {
  return { drone: state.drone, activity: state.activity };
};

class Drones extends Component {

  getLastFlightDate(droneID) {
    for (var i = this.props.activity.activities.length - 1; i >= 0; i--) {
      if (this.props.activity.activities[i].droneID === droneID) {
        return this.props.activity.activities[i].dt_created;
      }
    }
    return "/";
  }

  getThumbnailPicture(path) {
    try {
      return require(`${path}`);
    } catch (e) {
      return require("assets/img/default_drone.svg");
    }

  }

  getDroneContent(prop) {
    return <Col md={6} key={prop.droneID + "-col"}><Card title={prop.name} category={prop.vehicleType} stats={"last flight: " + moment(this.getLastFlightDate(prop.droneID) * 1000).fromNow()} statsIcon="fa fa-clock-o" content={
      <div>
        <div className="row">
          {/* <div className="col-lg-4"><img width="180px" src={"dronethumbs/" + prop.thumbnailpath} alt={prop.name} /></div> */}
          <DroneSmall droneToShow={prop} />
        </div>
        <div style={{paddingTop:"20px"}} className="row">
          <table className="table">
            <ActivitiesSmall filterDrone={true} droneID={prop.droneID} />
          </table>
        </div>
        <div className="row">
          {/* <div className="col-lg-10 h5">Statistics<br />5.4 GB data usage this month</div> */}
          <div className="col-lg-12 text-right">
            <Button className="pt-1" bsStyle="info" type="button" bsSize="small" pullRight fill >
              Settings
          </Button>&nbsp;
          <Button className="pt-1" bsStyle="danger" type="button" bsSize="small" pullRight fill >
              Remove Drone
          </Button>
          </div>
        </div>
      </div>

    } />
    </Col>
  }

  render() {
    var res = [];
    this.props.drone.drones.map((prop, key) => {
      if (key % 2 !== 0) {
        res.push(<Row key={prop.droneID + "-row"}>{this.getDroneContent(prop)}</Row>);
      } else {
        res.push(this.getDroneContent(prop));
      }
      return null;
    });
    return (
      <div className="content">
        <Grid fluid>
          {res}
        </Grid>
      </div>

    );
  }
}

export default connect(mapStateToProps)(Drones);
