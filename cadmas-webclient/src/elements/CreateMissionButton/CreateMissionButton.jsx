import React, { Component } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router';
import CadmasWS from '../../websocket/CadmasWS';
import util from 'util';

class CreateMissionButton extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            title: "",
            note: "",
            route: "",
            redirect: false,
            waypoints: []
        };
        this.setTitle = this.setTitle.bind(this);
        this.setNote = this.setNote.bind(this);
        this.setRoute = this.setRoute.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    handleOnSelectMode(eventKey, data) {
        this.setState({
            showModal: true,
            trigger: "modeChange",
            changeFlightModeTo: eventKey
        })
    }

    setTitle(event) {
        this.setState({
            title: event.target.value
        });
    }
    setNote(event) {
        this.setState({
            note: event.target.value
        });
    }
    setRoute(event) {
        var waypoints = this.parseMissionPlannerFile(this.state.route);
        if (waypoints !== undefined) {
            this.setState({
                waypoints: waypoints
            });
        }
        this.setState({
            route: event.target.value
        });
    }
    setFile(event) {
        console.log("setFile:" + util.inspect(event.target.value.getValue));
    }
    redirect(payload) {
        console.log("redirect from ack called");
        this.setState({
            redirect: true,
            missionIDToRedirect: payload.missionID
        });
    }

    getValidationState() {
        if (this.state.title.length !== 0) {
            if (this.state.route.startsWith('QGC')) {
                if (this.state.waypoints !== undefined && this.state.waypoints.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    parseMissionPlannerFile(file) {
        var waypoints = [];
        var lines = file.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const element = lines[i].split('\t');
            if (element.length !== 12) {
                return waypoints;
            }
            
            const altitude = element[10];
            const latitude = element[8];
            const longitude = element[9];
            var type = element[3];
            const missionIndex = element[0];
            if (element[0] === "0" && element[1] === "1") {
                type = "HOMEPOINT";
            } else if (type === "21") {
                type = "LAND";
            } else if (type === "22") {
                type = "TAKEOFF";
            } else if (type === "20") {
                type = "RTL";
            } else if (type === "16") {
                type = "WAYPOINT";
            } else if (type = "19") {
                type = "LOITER";
            } else {
                type = "INVALID";
            }
            waypoints.push({
                altitude: altitude,
                latitude: latitude,
                longitude: longitude,
                type: type,
                missionIndex: missionIndex
            });
        }
        return waypoints;
    }

    getWaypointInfo() {
        return <div><br /><span style={{ color: "red" }}>{this.state.waypoints.length}</span> Waypoints erkannt.</div>;
    }

    getModalText() {
        return <span >
            <p>You are going to create a new mission.</p><br />
            <form>
                <FormGroup controlId="getMissionInfoForm"
                    validationState={this.getValidationState()}>
                    <ControlLabel>Set the name of the mission</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="name"
                        onChange={this.setTitle}
                    /><br /><br />
                    <ControlLabel>Set a note of the mission</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="note"
                        onChange={this.setNote}
                    /><br /><br /><br /><br />
                    <ControlLabel>Insert the content of the KML or MissionPlanner waypoint file which includes the route{this.getWaypointInfo()}</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        type="text"
                        placeholder="route"
                        onChange={this.setRoute}
                    />
                </FormGroup>
            </form>
        </span>;
    }
    getModalTitle() {
        return "Create a new mission";
    }
    handleClose() {
        this.setState({
            showModal: false
        });
    }
    handleAccept() {
        this.setState({
            showModal: false
        });
        CadmasWS.addMission(this.state.title, this.state.note, this.state.route, "RTL", this.redirect.bind(this));
    }

    handleStopClick() {
        this.setState({
            showModal: true
        })
    }
    handleCreateMissionClick() {
        this.setState({
            showModal: true
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/mission/" + this.state.missionIDToRedirect} />;
        }
        return (<span>
            <CustomModal show={this.state.showModal} bsStyle="success" handleClose={this.handleClose.bind(this)} handleAccept={this.handleAccept.bind(this)} acceptTitle="Yes, I want to create a new mission." title={this.getModalTitle()} text={this.getModalText()} />
            <Button className="pt-1" bsStyle="success" type="button" bsSize="small" onClick={() => this.handleCreateMissionClick()}>
                CREATE MISSION
    </Button></span>
        );
    }
}
export default CreateMissionButton;







