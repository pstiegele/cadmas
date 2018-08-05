import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Label } from 'react-bootstrap';


const mapStateToProps = (state) => {
    return { activity: state.activity, drone: state.drone };
};



class DroneSmall extends Component {


    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }
    getSafeDroneName(droneID) {
        return this.getSafe(() => this.getDroneName(droneID).name, "")
    }
    getDroneName(droneID) {
        var result = this.props.drone.drones.filter(function (obj) {
            return obj.droneID === droneID;
        });
        return result[0];
    }

    getNumberOfActivitiesOfDrone() {
        if (this.props.droneToShow !== null && this.props.droneToShow !== undefined && this.props.droneToShow.droneID !== undefined) {
            var c = this.props.activity.activities.filter(activity => activity.droneID === this.props.droneToShow.droneID).length;
            return (c === 1 ? c + " flight" : c + " flights");
        } else {
            return "-";
        }

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
    getDataVolume() {
        if (this.props.droneToShow !== null && this.props.droneToShow !== undefined && this.props.droneToShow.datavolume !== undefined && this.props.droneToShow.datavolume !== null) {
            return this.getReadableSize(this.props.droneToShow.datavolume * 1024 * 1024) + " datavolume";
        } else {
            return "-"
        }
    }

    getSafeNote() {
        if (this.props.droneToShow !== null && this.props.droneToShow !== undefined && this.props.droneToShow.note !== undefined && this.props.droneToShow.note !== null && this.props.droneToShow.note !== "") {
            return this.props.droneToShow.note;
        }
        return "nothing noted";
    }
    getSafeSoftwareVersion() {
        if (this.props.droneToShow !== null && this.props.droneToShow !== undefined && this.props.droneToShow.softwareVersion !== undefined && this.props.droneToShow.softwareVersion !== null && this.props.droneToShow.softwareVersion !== "") {
            return this.props.droneToShow.softwareVersion;
        }
        return "-";
    }
    getSafeManufacturer() {
        if (this.props.droneToShow !== null && this.props.droneToShow !== undefined && this.props.droneToShow.manufacturer !== undefined && this.props.droneToShow.manufacturer !== null && this.props.droneToShow.manufacturer !== "") {
            return this.props.droneToShow.manufacturer;
        }
        return "-";
    }
    getSafeConnectorType() {
        if (this.props.droneToShow !== null && this.props.droneToShow !== undefined && this.props.droneToShow.connectorType !== undefined && this.props.droneToShow.connectorType !== null && this.props.droneToShow.connectorType !== "") {
            return this.props.droneToShow.connectorType;
        }
        return "-";
    }
    getAgeOfDrone() {
        if (this.props.droneToShow !== null && this.props.droneToShow !== undefined && this.props.droneToShow.dt_created !== undefined && this.props.droneToShow.dt_created !== null && this.props.droneToShow.dt_created !== "") {
            return moment(this.props.droneToShow.dt_created).fromNow(true);
        }
        return "-";
    }
    getDroneIsConnected() {
        if (this.props.droneToShow !== undefined && this.props.droneToShow !== null && this.props.droneToShow.connected === true) {
            return true;
        } else {
            return false;
        }
    }
    getDroneConnectedStyle() {
        if (this.getDroneIsConnected()) {
            return "success";
        } else {
            return "default";
        }
    }
    render() {
        return <Grid fluid>

            <Row>
                <Col xs={5} style={{ minWidth: "180px" }}>
                    <img src={"/dronethumbs/" + this.getSafe(() => this.props.droneToShow.thumbnailpath, "")} alt={this.getSafe(() => this.props.droneToShow.name, "")} />
                </Col>
                <Col xs={7}>
                    <div style={{paddingBottom:"20px"}}>
                        <Label style={{ padding: "6px" }} bsStyle={this.getDroneConnectedStyle()}>{this.getDroneIsConnected() ? "drone connected" : "drone not connected"}</Label>
                    </div>
                    <div>
                        <p>
                            <i className="fa fa-calendar"></i>
                            &nbsp;&nbsp;{"owned for " + this.getAgeOfDrone()}</p>
                    </div>
                    <div>
                        <p>
                            <i className="fa fa-industry"></i>
                            &nbsp;&nbsp;{this.getSafeManufacturer()}</p>
                    </div>
                    <div>
                        <p>
                            <i className="fa fa-plane"></i>
                            &nbsp;&nbsp;{this.getNumberOfActivitiesOfDrone()}</p>
                    </div>
                    <div>
                        <p>
                            <i className="fa fa-database"></i>
                            &nbsp;&nbsp;{this.getDataVolume()}</p>
                    </div>
                    <div>
                        <p>
                            <i className="fa fa-microchip"></i>
                            &nbsp;&nbsp;{this.getSafeConnectorType()}</p>
                    </div>
                    <div>
                        <p>
                            <i className="fa fa-code-branch"></i>
                            &nbsp;&nbsp;{this.getSafeSoftwareVersion()}</p>
                    </div>
                    <div>
                        <p>
                            <i className="fa fa-sticky-note"></i>
                            &nbsp;&nbsp;{this.getSafeNote()}</p>
                    </div>

                </Col>
            </Row>
        </Grid>;
    }
}
export default connect(mapStateToProps)(DroneSmall);
