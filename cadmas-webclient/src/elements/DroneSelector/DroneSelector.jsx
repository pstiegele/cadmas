import React, { Component } from 'react';
import CustomDropdown from '../CustomDropdown/CustomDropdown';

class MissionTitleControlButtons extends Component {

    constructor(){
        super();
    }

    componentWillMount(){
        this.setState({
            title: this.getDroneNames()[0].title
        });
        this.props.onSelectDrone(this.getDroneNames()[0].key);
    }

    getDroneNames() {
        var droneNames = [];
        this.props.drones.forEach(element => {
            droneNames.push({
                title: element.name,
                key: element.droneID
            });
        });
        return droneNames;
    }

    getDroneNameToID(droneID){
        this.props.drones.forEach(element => {
            if(element.droneID===droneID){
                this.setState({
                    title: element.name
                });
            }
        });
        return "";
    }

    handleOnSelectDrone(event, data) {
       this.getDroneNameToID(event);
       this.props.onSelectDrone(event);
    }

    getSafeDroneNameTitle() {
        return this.getDroneNames()[0].title;
    }

    render() {
        return (
            <CustomDropdown title={this.state.title} bsStyle="primary" bsSize="small" key="droneDropdown" menuItems={this.getDroneNames()} onSelect={this.handleOnSelectDrone.bind(this)} />
        );
    }
}

export default MissionTitleControlButtons;







