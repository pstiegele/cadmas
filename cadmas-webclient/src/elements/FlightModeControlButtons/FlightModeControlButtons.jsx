import React, { Component } from 'react';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import CustomModal from '../CustomModal/CustomModal';
import Button from 'elements/CustomButton/CustomButton.jsx';

class FlightModeControlButtons extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      showStopModal:false,
      trigger: "",
      activeFlightMode: 'AUTO',
      changeFlightModeTo: 'AUTO'
    };
  }

  getDropdownModes() {
    var res = [{
      title: "AUTO",
      key: 'AUTO',
      active: true
    }, {
      title: "RETURN TO LAUNCH",
      key: 'RTL',
      active: false
    }, {
      title: "LOITER",
      key: 'LOITER',
      active: false
    }, {
      title: "STABILIZE",
      key: 'STABILIZE',
      active: false
    }, {
      title: "MANUAL",
      key: 'MANUAL',
      active: false
    }, {
      title: "FLY BY WIRE THROTTLE MANUAL",
      key: 'FBWA',
      active: false
    }, {
      title: "FLY BY WIRE THROTTLE AUTO",
      key: 'FBWB',
      active: false
    }]
    return res;
  }

  handleOnSelectMode(eventKey, data) {
    this.setState({
      showModal: true,
      trigger: "modeChange",
      changeFlightModeTo: eventKey
    })
  }

  getModalText(){
    if(this.state.trigger==="modeChange"){
      
    switch (this.state.changeFlightModeTo) {
      case 'AUTO':
        return <span>Are you sure you want to activate the <b>AUTO</b> flight mode? Your drone will continue the mission.</span>
        break;
      case 'RTL':
        return <span>Are you sure you want to activate the <b>Return-to-launch</b> flight mode? Your drone will fly back to the starting point.</span>
        break;
      case 'LOITER':
        return <span>Are you sure you want to activate the <b>LOITER</b> flight mode? Your drone will fly circles.</span>
        break;
      case 'STABILIZE':
        return <span>Are you sure you want to activate the <b>STABILIZE</b> flight mode? I do not really know what the mode does.</span>
        break;
      case 'MANUAL':
        return <span>Are you sure you want to activate the <b>MANUAL</b> flight mode? Make sure if your remote control is ready for use.</span>
        break;
      case 'FBWA':
        return <span>Are you sure you want to activate the <b>FLY BY WIRE THROTTLE MANUAL</b> flight mode? You will control the throttle of the drone manually.</span>
        break;
      case 'FBWB':
        return <span>Are you sure you want to activate the <b>FLY BY WIRE THROTTLE AUTO</b> flight mode? The throttle of the drone will be controlled automatically.</span>
        break;
    
      default:
        break;
    }   
  }else if(this.state.trigger==="stop") {
    return <span>Are you sure you want to quit the activity? Do not continue if your drone is still in the air. This action can not be undone.</span>
  }
  }
  getModalTitle(){
    if(this.state.trigger==="modeChange"){
    return "Activate "+this.state.changeFlightModeTo+" flight mode";
    }else if(this.state.trigger==="stop") {
    return "STOP ACTIVITY"
    }
  }
  handleClose(){
    this.setState({
      showModal:false
    });
  }
  handleAccept(){
    if(this.state.trigger==="modeChange"){
      this.setState({
        showModal:false,
        activeFlightMode: this.state.changeFlightModeTo
      });
      //TODO CHANGE FLIGHT MODE
    }else if(this.state.trigger==="stop") {
      this.setState({
        showModal:false
      });
      //TODO STOP MISSION
    }

    
  }

  handleStop(){
    this.setState({
      showModal: true,
      trigger: "stop"
    })
  }
  render() {
    return (<span>
      <CustomDropdown title={this.state.activeFlightMode} bsStyle="warning" bsSize="small" key="modeDropdown" menuItems={this.getDropdownModes()} onSelect={this.handleOnSelectMode.bind(this)} /> &nbsp;
      <CustomModal show={this.state.showModal} handleClose={this.handleClose.bind(this)} handleAccept={this.handleAccept.bind(this)} acceptTitle="Yes, I know what I do." title={this.getModalTitle()} text={this.getModalText()}/>
      <Button className="pt-1" bsStyle="danger" type="button" bsSize="small" onClick={() => this.handleStop()}>
        STOP ACTIVITY
  </Button></span>
    );
  }
}

export default FlightModeControlButtons;







