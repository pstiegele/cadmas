import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { connect } from "react-redux";



const mapStateToProps = (state) => {
  return { drone: state.drone, activity: state.activity };
};

class GetDroneConnector extends Component {

  handleDownloadArdupilot(){
    window.location.href = "http://paul-stiegele.de/download/skywalker-connector.zip";
  }
  handleDownloadiNav(){
    alert("This is just an example connector.");
  }
  handleUpload(){
    alert("Upload is just an example.");
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col sm={6}>
              <Card title="Ardupilot" category="preconfigured, mostly for planes" stats="last build: 2 month ago" statsIcon="fa fa-clock" content={<div className="content text-center">
              <div className="content"><i className="pe-7s-plane" style={{fontSize: "10em", color: "grey"}}> </i></div>
                <Button className="pt-1" bsStyle="success" type="button" bsSize="small" pullRight={true} fill={true} onClick={() => this.handleDownloadArdupilot()}>
            Download
          </Button>
          <p className="text-muted">
                <a href="http://paul-stiegele.de/download/Entwicklung_einer_webbasierten_Drohnen_Management_Suite_zur_autonomen_Steuerung_und_Verwaltung_von_UAVs.pdf" >Installation Manual</a>
          </p>
                </div>
                } />
                 </Col>
                 <Col sm={6}>
              <Card title="iNav" category="for quadrocopter usage" stats="last build: 8 month ago" statsIcon="fa fa-clock" content={<div className="content text-center">
              <div className="content"><i className="pe-7s-paper-plane" style={{fontSize: "10em", color: "grey"}}> </i></div>
                <Button className="pt-1" bsStyle="success" type="button" bsSize="small" pullRight={true} fill={true} onClick={() => this.handleDownloadiNav()}>
            Download
          </Button>
          <p className="text-muted">
                <a href="http://paul-stiegele.de/download/Entwicklung_einer_webbasierten_Drohnen_Management_Suite_zur_autonomen_Steuerung_und_Verwaltung_von_UAVs.pdf" >Installation Manual</a>
          </p>
                </div>
                } />
            </Col>
          </Row>
          <Row>
          <Col sm={6}>
              <Card title="Develop your own" category="and upload it to be a part of CADMAS" stats="don't wait" statsIcon="fa fa-wrench" content={<div className="content text-center">
              <div className="content"><i className="pe-7s-cloud-upload" style={{fontSize: "10em", color: "grey"}}> </i></div>
                <Button className="pt-1" bsStyle="success" type="button" bsSize="small" pullRight={true} fill={true} onClick={() => this.handleUpload()}>
            Upload
          </Button>
          <p className="text-muted">
                <a href="http://paul-stiegele.de/download/Entwicklung_einer_webbasierten_Drohnen_Management_Suite_zur_autonomen_Steuerung_und_Verwaltung_von_UAVs.pdf" >API documentation</a>
          </p>
                </div>
                } />
            </Col>
            </Row>
        </Grid>
      </div>

    );
  }
}

export default connect(mapStateToProps)(GetDroneConnector);
