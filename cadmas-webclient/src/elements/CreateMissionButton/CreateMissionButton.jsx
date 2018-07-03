import React, { Component } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router';
import CadmasWS from '../../websocket/CadmasWS';

class CreateMissionButton extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            title: "",
            note: "",
            route: "",
            redirect: false
        };
        this.setTitle = this.setTitle.bind(this);
        this.setNote = this.setNote.bind(this);
        this.setRoute = this.setRoute.bind(this);
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
        this.setState({
            route: event.target.value
        });
    }
    redirect(payload) {
        console.log("redirect from ack called");
        this.setState({
            redirect: true,
            missionIDToRedirect: payload.missionID
        });
    }

    getModalText() {
        return <span >
            <p>You are going to create a new mission.</p><br />
            <form>
                <FormGroup controlId="getMissionInfoForm">
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
                    <ControlLabel>Insert the content of the KML file which includes the route</ControlLabel>
                    <FormControl
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







