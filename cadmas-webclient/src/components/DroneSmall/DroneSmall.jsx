import React, { Component } from 'react';
import { connect } from "react-redux";
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col} from 'react-bootstrap';



const mapStateToProps = (state) => {
    return { activity: state.activity, drone: state.drone };
};



class DroneSmall extends Component {
  
    dataSales = {
        labels: ['JAN', 'MAR', 'MAI', 'JUL', 'SEP'],
        series: [
            [492, 554, 586, 698, 695],
            [240, 287, 335, 435, 437],
            [108, 190, 239, 307, 308]
        ]
    };
    optionsSales = {
        low: 0,
        high: 800,
        showArea: false,
        axisX: {
            showGrid: false,
        },
        lineSmooth: true,
        showLine: true,
        showPoint: false,
        fullWidth: true,
        
    };
    responsiveSales = [
        ['screen and (max-width: 640px)', {
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];
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
    render() {
        return <Grid fluid>
            <Row>
                <Col md={5}>
                    <img src={"dronethumbs/" + this.getSafe(() => this.props.droneToShow.thumbnailpath, "")} alt={this.getSafe(() => this.props.droneToShow.name, "")} />
                </Col>
                <Col md={7}>
                    <ChartistGraph data={this.dataSales} type="Line" options={this.optionsSales} responsiveOptions={this.responsiveSales} />
                </Col>
            </Row>
        </Grid>;
    }
}
export default connect(mapStateToProps)(DroneSmall);
