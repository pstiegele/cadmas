import React, { Component } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import Button from 'elements/CustomButton/CustomButton.jsx';
import DroneSelector from 'elements/DroneSelector/DroneSelector.jsx';
import CadmasWS from '../../websocket/CadmasWS';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router';


class MissionTitleControlButtons extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            missionID: 0,
            droneID: 0,
            title: "",
            note: "",
            redirect: false
        };
        this.setDrone = this.setDrone.bind(this);
        this.setNote = this.setNote.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    componentWillMount() {
        this.setState({
            missionID: this.props.missionID
        });
    }

    getModalTitle() {
        return "CREATE AN ACTIVITY TO START THIS MISSION";
    }
    setDrone(droneID) {
        this.setState({
            droneID: droneID
        });
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

    getModalText() {
        return <span >
            <p>Are you sure you want to create an activity to be able to start this mission? Choose the drone you want to fly with:</p><br />
            <span ><DroneSelector drones={this.props.drones} onSelectDrone={this.setDrone} /></span>
            <br /><br /><br />
            <form>
                <FormGroup controlId="getActivityInfoForm">
                    <ControlLabel>Set the name of the activity</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        placeholder="name"
                        onChange={this.setTitle}
                    /><br />
                    <ControlLabel>Set an optional note of the activity</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="note"
                        onChange={this.setNote}
                    />
                </FormGroup>
            </form>
            <br /><br /><br /><small>The drone does not start automatically after this step. </small>
        </span>;
    }
    handleClose() {
        this.setState({
            showModal: false
        });
    }
    handleAccept() {
        if (this.state.title === null || this.state.title === undefined || this.state.title === "" || this.state.title.length === 0) {
            alert("Please give the activity a title.");
        } else {

            var droneID = this.state.droneID;
            this.setState({
                showModal: false
            });
            if (droneID === undefined) {
                droneID = this.props.drones[0].droneID;
                this.setState({
                    droneID: this.props.drones[0].droneID
                });
            }
            CadmasWS.addActivity(this.props.missionID, droneID, this.state.title, 0, this.state.note, this.redirect.bind(this));

        }
    }

    redirect(payload) {
        this.setState({
            redirect: true,
            activityIDToRedirect: payload.activityID
        });
    }

    handleStart() {
        this.setState({
            showModal: true,
        });

    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/activity/" + this.state.activityIDToRedirect} />;
        }
        return (<span>
            <CustomModal bsStyle="success" show={this.state.showModal} handleClose={this.handleClose.bind(this)} handleAccept={this.handleAccept.bind(this)} acceptTitle="Yes, I want to create an activity" title={this.getModalTitle()} text={this.getModalText()} />
            <Button className="pt-1" bsStyle="success" type="button" bsSize="small" onClick={this.handleStart.bind(this)}>
                FLY THIS MISSION NOW!
  </Button></span>
        );
    }
}

export default MissionTitleControlButtons;







