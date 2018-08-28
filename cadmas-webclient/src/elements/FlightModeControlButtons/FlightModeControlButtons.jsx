import React, { Component } from 'react';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import CustomModal from '../CustomModal/CustomModal';
import { Label } from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import CadmasWS from '../../websocket/CadmasWS';

class FlightModeControlButtons extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      showStopModal: false,
      trigger: "",
      activeFlightMode: 'AUTO',
      changeFlightModeTo: 'AUTO'
    };
  }



  getDropdownModes() {
    var res = [{
      title: "AUTO",
      eventKey: 'AUTO',
      active: true
    }, {
      title: "RETURN TO LAUNCH",
      eventKey: 'RTL',
      active: false
    }, {
      title: "LOITER",
      eventKey: 'LOITER',
      active: false
    }, {
      title: "STABILIZE",
      eventKey: 'STABILIZE',
      active: false
    }, {
      title: "MANUAL",
      eventKey: 'MANUAL',
      active: false
    }, {
      title: "FLY BY WIRE THROTTLE MANUAL",
      eventKey: 'FBWA',
      active: false
    }, {
      title: "FLY BY WIRE THROTTLE AUTO",
      eventKey: 'FBWB',
      active: false
    }]
    return res;
  }

  getFlightModeNameToKey(eventKey) {
    var res = "";
    this.getDropdownModes().forEach(function (element) {
      if (element.eventKey === eventKey) {
        res = element.title;
      }
    });
    return res;
  }

  handleOnSelectMode(eventKey, data) {
    this.setState({
      showModal: true,
      trigger: "modeChange",
      changeFlightModeTo: eventKey
    })
  }

  getModalText() {
    if (this.state.trigger === "modeChange") {

      switch (this.state.changeFlightModeTo) {
        case 'AUTO':
          return <span>Are you sure you want to activate the <b>AUTO</b> flight mode? Your drone will continue the mission.</span>
        case 'RTL':
          return <span>Are you sure you want to activate the <b>Return-to-launch</b> flight mode? Your drone will fly back to the starting point.</span>
        case 'LOITER':
          return <span>Are you sure you want to activate the <b>LOITER</b> flight mode? Your drone will fly circles.</span>
        case 'STABILIZE':
          return <span>Are you sure you want to activate the <b>STABILIZE</b> flight mode? I do not really know what the mode does.</span>
        case 'MANUAL':
          return <span>Are you sure you want to activate the <b>MANUAL</b> flight mode? Make sure if your remote control is ready for use.</span>
        case 'FBWA':
          return <span>Are you sure you want to activate the <b>FLY BY WIRE THROTTLE MANUAL</b> flight mode? You will control the throttle of the drone manually.</span>
        case 'FBWB':
          return <span>Are you sure you want to activate the <b>FLY BY WIRE THROTTLE AUTO</b> flight mode? The throttle of the drone will be controlled automatically.</span>

        default:
          return "Error. Please refresh the site."
      }
    } else if (this.state.trigger === "stop") {
      return <span>Are you sure you want to quit the activity? <b>Do not continue if your drone is still in the air, you will <span style={{ color: "red" }}>lose full control</span></b>. This action can not be undone.</span>;
    } else if (this.state.trigger === "start") {
      return <span>Are you sure you want to start the activity? <br /><b>Do not continue if your drone isn't ready to start.<br /><span style={{ color: "red" }}>This step activates the motors.</span></b></span>;
    } else if (this.state.trigger === "cameraImages"){
      return <span>Your camera images are getting combined into a zip file. This can take a certain amount of time depending on the number of shots. The download will start automatically as soon as the file is available.</span>;
    }
  }
  getModalTitle() {
    if (this.state.trigger === "modeChange") {
      return "Activate " + this.state.changeFlightModeTo + " flight mode";
    } else if (this.state.trigger === "stop") {
      return "STOP ACTIVITY"
    } else if (this.state.trigger === "start") {
      return "START ACTIVITY"
    } else if (this.state.trigger === "cameraImages") {
      return "DOWNLOAD CAMERA IMAGES"
    }
  }
  handleClose() {
    this.setState({
      showModal: false
    });
  }
  handleAccept() {
    if (this.state.trigger === "modeChange") {
      this.setState({
        showModal: false,
        activeFlightMode: this.getFlightModeNameToKey(this.state.changeFlightModeTo)
      });
      CadmasWS.setMode(this.state.changeFlightModeTo, this.props.droneID);
    } else if (this.state.trigger === "stop") {
      this.setState({
        showModal: false
      });
      CadmasWS.stopActivity(this.props.activityID);
    } else if (this.state.trigger === "start") {
      this.setState({
        showModal: false
      });
      CadmasWS.startActivity(this.props.activityID);
    } else if (this.state.trigger === "cameraImages") {
      this.setState({
        showModal: false
      });
    }
  }

  handleStopClick() {
    this.setState({
      showModal: true,
      trigger: "stop"
    })
  }
  handleDownloadCameraImagesClick() {
    this.setState({
      showModal: true,
      trigger: "cameraImages"
    })
    CadmasWS.getCameraImages(this.props.activityID, function(payload){
      this.setState({
        showModal: false
      });
      window.location.href = payload.downloadURL;
    }.bind(this));
  }
  handleStartFlightClick() {
    this.setState({
      showModal: true,
      trigger: "start"
    })
  }

  getArmedBsStyle() {
    if (this.props.heartbeat.isArmed) {
      return "danger";
    } else {
      return "default"
    }
  }
  getArmedTitle() {
    if (this.props.heartbeat.isArmed) {
      return "armed";
    } else {
      return "disarmed"
    }
  }
  getSafeCustomMode() {
    if (this.props.heartbeat !== undefined && this.props.heartbeat !== null) {
      switch (this.props.heartbeat.customMode) {
        case 0:
          return "MANUAL"
        case 1:
          return "CIRCLE"

        case 2:
          return "STABILIZE"

        case 3:
          return "TRAINING"

        case 4:
          return "ACRO"

        case 5:
          return "FLY BY WIRE THROTTLE MANUAL"

        case 6:
          return "FLY BY WIRE THROTTLE AUTO"

        case 7:
          return "CRUISE"

        case 8:
          return "AUTOTUNE"

        case 10:
          return "AUTO"

        case 11:
          return "RTL"

        case 12:
          return "LOITER"

        case 14:
          return "AVOID_ADSB"

        case 15:
          return "GUIDED"

        case 16:
          return "INITIALISING"

        case 17:
          return "QSTABILIZE"

        case 18:
          return "QHOVER"

        case 19:
          return "QLOITER"

        case 20:
          return "QLAND"

        case 21:
          return "QRTL"

        default:
          break;
      }
      return "Error";
    } else {
      return "Error";
    }
  }
  getButtonStatus() {
    if (this.otherActivityRunning()) {
      return true;
    } else {
      return !this.getDroneIsConnected();
    }
  }
  getDroneIsConnected() {
    if (this.props.droneConnected !== undefined && this.props.droneConnected !== null && this.props.droneConnected === true) {
      return true;
    } else {
      return false;
    }
  }
  getDroneConnectedStyle(){
    if(this.getDroneIsConnected()){
      return "success";
    }else{
      return "default";
    }
  }
  otherActivityRunning(){
    var droneID = this.props.droneID || -1;
    var res = this.props.activities.filter(activity => activity.droneID === droneID && activity.state === "1");
    if (res === null || res === undefined || res.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    if (this.props.state === 0) {
      return (<span>
        <CustomModal show={this.state.showModal} bsStyle="success" handleClose={this.handleClose.bind(this)} handleAccept={this.handleAccept.bind(this)} acceptTitle="Yes, I want to start the drone." title={this.getModalTitle()} text={this.getModalText()} />
        {this.otherActivityRunning()?<Label bsStyle="danger">there is another running activity on this drone</Label>:""}&nbsp;
        <Label bsStyle={this.getDroneConnectedStyle()}>{this.getDroneIsConnected()?"drone connected":"drone not connected"}</Label> &nbsp;
        <Button disabled={this.getButtonStatus()} className="pt-1" bsStyle="success" type="button" bsSize="small" onClick={() => this.handleStartFlightClick()}>
          START ACTIVITY
    </Button></span>
      );
    } else if (this.props.state === 1) {
      return (<span>
        <Label bsStyle={this.getDroneConnectedStyle()}>{this.getDroneIsConnected()?"drone connected":"drone not connected"}</Label> &nbsp;
        <Label bsStyle={this.getArmedBsStyle()}>{this.getArmedTitle()}</Label> &nbsp;
        <CustomDropdown title={this.getSafeCustomMode()} bsStyle="warning" bsSize="small" dropdownKey="modeDropdown" menuItems={this.getDropdownModes()} onSelect={this.handleOnSelectMode.bind(this)} /> &nbsp;
        <CustomModal show={this.state.showModal} bsStyle="danger" handleClose={this.handleClose.bind(this)} handleAccept={this.handleAccept.bind(this)} acceptTitle="Yes, I know what I do." title={this.getModalTitle()} text={this.getModalText()} />
        <Button className="pt-1" bsStyle="danger" type="button" bsSize="small" onClick={() => this.handleStopClick()}>
          STOP ACTIVITY
    </Button></span>
      );
    }else if(this.props.state === 2){
      return <span>
        <CustomModal show={this.state.showModal} bsStyle="success" handleClose={this.handleClose.bind(this)} handleAccept={this.handleAccept.bind(this)} acceptTitle="Close" title={this.getModalTitle()} text={this.getModalText()} />
        <Button className="pt-1" bsStyle="primary" type="button" bsSize="small" onClick={() => this.handleDownloadCameraImagesClick()}>
      Download camera images
</Button>
</span>;
    }
    return null;
  }
}

export default FlightModeControlButtons;







