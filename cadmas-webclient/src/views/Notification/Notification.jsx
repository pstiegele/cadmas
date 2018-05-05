import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';


import Card from 'components/Card/Card.jsx';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import Maps from '../Maps/Maps';



const mapStateToProps = (state) => {
    return { mission: state.mission, drone: state.drone, activity: state.activity, notification: state.notification };
};


class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            notificationID: parseInt(this.props.match.params.notificationID, 10), 
            selectedDrones: []
        };

    }


    getRelativeOrAbsoluteDate(date) {
        if (new Date() - new Date(date * 1000) < 604800000) {
            return moment(date * 1000).fromNow();
        } else {
            return moment(date * 1000).locale("de", localization).format("LLL");
        }
    }
    getAbsoluteDate(date) {
        return moment(date * 1000).locale("de", localization).format("LLL");
    }
    getRelativeDate(date) {
        return moment(date * 1000).fromNow();
    }
    getAbsoluteEndDate(start, end) {
        if (moment.duration((end - start) * 1000).asDays() > 1) {
            return moment(end * 1000).format("LLL");
        } else {
            return moment(end * 1000).format("LT");
        }
    }
    getDuration(duration) {
        console.log("du: " + duration);
        if (moment.duration(duration * 1000).asMinutes() > 60) {
            if (moment.duration(duration * 1000).asHours() > 24) {
                return Math.round(moment.duration(duration * 1000).asDays()) + " days";
            } else {
                return Math.round(moment.duration(duration * 1000).asHours()) + " hours";
            }
        } else {
            return Math.round(moment.duration(duration * 1000).asMinutes()) + " min";
        }

    }
    getNotificationType(type) {
        switch (type) {
            case 0:
                return <i className="fa fa-info" style={{ color: "#006400" }}>&nbsp;Info</i>;
            case 1:
                return <i className="fa fa-exclamation" style={{ color: "#B8860B" }}>&nbsp;Warning</i>;
            case 2:
                return <i className="fa fa-bolt" style={{ color: "#DC143C" }}>&nbsp;Error</i>;

            default:
                return "info";
        }
    }


    getTimeAfterStart(occured, activityStart) {
        return Math.round(moment.duration((occured - activityStart) * 1000).asMinutes());
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
    getSafeActivityName(activityID) {
        return this.getSafe(() => this.getActivityByID(activityID).name, "")
    }
    getSafeActivityDtCreated(activityID) {
        return this.getSafe(() => this.getActivityByID(activityID).dt_created, "")
    }
    getSafeActivityDtEnded(activityID) {
        return this.getSafe(() => this.getActivityByID(activityID).dt_ended, "")
    }
    getSafeActivityState(activityID) {
        return this.getSafe(() => this.getActivityByID(activityID).state, "")
    }
    getSafeNotificationTitle(notificationID) {
        return this.getSafe(() => this.getNotificationByID(notificationID).title, "")
    }
    getSafeNotificationType(notificationID) {
        return this.getSafe(() => this.getNotificationByID(notificationID).type, "")
    }
    getActivityIDByNotificationID(notificationID) {
        return this.getSafe(() => this.getNotificationByID(notificationID).activityID, "");
    }
    getSafeNotificationDescription(notificationID) {
        return this.getSafe(() => this.getNotificationByID(notificationID).description, "");
    }
    getSafeNotificationDtOccured(notificationID) {
        return this.getSafe(() => this.getNotificationByID(notificationID).dt_occured, "");
    }
    getActivityByID(activityID) {

        var result = this.props.activity.activities.filter(function (obj) {
            return obj.activityID === activityID;
        });
        return result[0];
    }
    getNotificationByID(notificationID) {

        var result = this.props.notification.notifications.filter(function (obj) {
            return obj.notificationID === notificationID;
        });
        return result[0];
    }

    handleClick(that) {
        this.setState({ redirect: true, redirectToActivity: that._targetInst.return.key });
    }

    getDate() {
        var occured = parseInt(this.getSafeNotificationDtOccured(this.state.notificationID), 10);
        var activityStart = parseInt(this.getSafeActivityDtCreated(this.getActivityIDByNotificationID(this.state.notificationID)), 10);
        return this.getAbsoluteDate(occured) + " (" + this.getRelativeDate(occured) + ", " + this.getTimeAfterStart(occured, activityStart) + " min after start)";
    }



    getState() {
        var state = parseInt(this.getSafeActivityState(this.state.activityID), 10);
        switch (state) {
            case 0:
                return <div><i className="fa fa-circle" style={{ color: "grey" }} key={"activityStatus"}></i>{" activity has not started yet."}</div>;


            case 1:
                return <div><i className="fa fa-circle" style={{ color: "red" }} key={"activityStatus"}></i>{" activity is currently live"}</div>;


            case 2:
                return <div><i className="fa fa-circle" style={{ color: "green" }} key={"activityStatus"}></i>{" activity was successfully completed"}</div>;


            default:
                break;
        }
    }

    render() {
        return (<div className="content">
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card title={this.getSafeNotificationTitle(this.state.notificationID)} category={<div>{this.getDate()}<br />{this.getNotificationType(this.getSafeNotificationType(this.state.notificationID))}</div>} ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={
                            <div className="content">
                                <samp>
                                    {this.getSafeNotificationDescription(this.state.notificationID)}
                                </samp>
                            </div>
                        } />
                    </Col>
                </Row>
            </Grid>
        </div>);
    }
}
export default connect(mapStateToProps)(Notification);
