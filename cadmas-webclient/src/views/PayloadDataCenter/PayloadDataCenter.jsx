import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { Grid, Row, Col,  Table  } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import ActivitiesSmall from 'components/ActivitiesSmall/ActivitiesSmall.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { connect } from "react-redux";
import moment from "moment";
import { NavLink } from 'react-router-dom';
import localization from 'moment/locale/de'
import util from 'util';



const mapStateToProps = (state) => {
    return { drone: state.drone, activity: state.activity, payload: state.payload, payloadDevice: state.payloadDevice };
};

class PayloadDataCenter extends Component {

    thArray = [
        "",
        "payload",
        "activity name",
        "size",
        "download"
    ];

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
    getRelativeOrAbsoluteDate(date) {
        if (new Date() - new Date(date * 1000) < 604800000) {
            return moment(date * 1000).fromNow();
        } else {
            return moment(date * 1000).locale("de", localization).format("LLL");
        }
    }
    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }
    getSafePayloadDeviceName(payloadDeviceID) {
        return this.getSafe(() => this.getPayloadDeviceByID(payloadDeviceID).name, "");
    }
    getPayloadDeviceByID(payloadDeviceID) {
        
        var result = this.props.payloadDevice.payloadDevices.filter(function (obj) {
            return obj.payloadDeviceID === payloadDeviceID;
        });
        return result[0];
    }
    getSafeActivityName(activityID) {
        return this.getSafe(() => this.getActivityByID(activityID).name, "");
    }
    getActivityByID(activityID) {
        var result = this.props.activity.activities.filter(function (obj) {
            return obj.activityID === activityID;
        });
        return result[0];
    }
    getReadableSize(size) {
        if (size < 1024) {
            return size + " Byte";
        } else if (size < 1048576) {
            return Math.round(size / 1024) + " kB";
        } else if (size < 1073741824) {
            return Math.round(size / 1048576) + " MB";
        } else if (size < 1099511627776) {
            return Math.round(size / 1073741824) + " GB";
        } else {
            return Math.round(size / 1099511627776) + " TB";
        }
    }
    getPayloadToActivity(activityID){
        var payload = [];
        this.props.payload.payloads.map((prop, key) => {
            if(prop.activityID===activityID){
                payload.push(prop);
            }
        });
        return payload;
    }
    
    handleClick(that){
        this.setState({redirect: true, redirectToActivity: that._targetInst.return.key});
      }

    getDroneActivityCards(drone) {
        var activities = this.props.activity.activities.slice(0).reverse();
        var cardcounter = 0;
        var cards = [];
        
        for (var i = 0; i < activities.length - 1; i++) {
            if (cardcounter >= 3) {
                break;
            }
            if (activities[i].droneID === drone.droneID) {
                cardcounter++;
                var activity = activities[i];
                var payload = this.getPayloadToActivity(activity.activityID);
                cards.push(
                    <Row key={activity.activityID}>
                        <Col md={12}>
                            <Card title={activity.name} category={this.getRelativeOrAbsoluteDate(activity.dt_created)} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
                                <div className="content">
                                    <Table striped hover ><thead>
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
                                                payload.map((prop, key) => {

                                                    return (<tr key={prop.payloadID} onClick={this.handleClick.bind(this)}>

                                                        <td key={prop.payloadID + "-icon"}>
                                                            <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                                                                <i className="fa fa-camera"></i>
                                                            </NavLink>
                                                        </td>
                                                        <td key={prop.payloadID + "-payload"}>{this.getSafePayloadDeviceName(prop.payloadDeviceID)}</td>
                                                        <td key={prop.payloadID + "-activityName"}>{this.getSafeActivityName(prop.activityID)}</td>
                                                        <td key={prop.payloadID + "-size"}>{this.getReadableSize(prop.size)}</td>
                                                        <td key={prop.payloadID + "-download"}>
                                                            <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                                                                <i className="fa fa-cloud-download"></i>
                                                            </NavLink>
                                                        </td>

                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            } />
                        </Col>
                    </Row>
                );
            }
        }
        return cards;
    }

    getDroneContent(prop) {
        return <Col md={6} key={prop.droneID + "-col"}><Card title={prop.name} category={prop.vehicleType} stats={"32 GB"} statsIcon="fa fa-hdd" content={
            <div className="content">
                <Grid fluid>
                    {this.getDroneActivityCards(prop)}
                </Grid>
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

export default connect(mapStateToProps)(PayloadDataCenter);
