import React, { Component } from 'react';
import { connect } from "react-redux";
import ChartistGraph from 'react-chartist';

const mapStateToProps = (state) => {
    return { mission: state.mission };
};


class AltitudeProfile extends Component {
    componentDidMount() {

    }

    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }

    getDistance() {
        var mission = this.props.missionToShow;
        if (mission !== undefined && mission.distance !== undefined && mission.distance !== null) {
            var d = mission.distance;
            if (d > 1000) {
                return (mission.distance / 1000).toFixed(2) + " km";
            } else {
                return Math.round(mission.distance) + " m";
            }

        }
        return "";
    }

    getChartData() {
        var waypointNumbers = [];
        var altitudes = [];
        var mission = this.props.missionToShow;
        if (mission !== undefined && mission !== null && mission.waypoints !== undefined) {
            var waypoints = mission.waypoints.filter(waypoint => waypoint.type!=="HOMEPOINT"&&waypoint.type!=="TAKEOFF");
            for (let i = 0; i < waypoints.length; i++) {
                waypointNumbers.push(i);
                altitudes.push(waypoints[i].altitude);
            }
        }



        return {
            labels: waypointNumbers,
            series: [altitudes]
        };
    }

    getChartOptionsBar() {
        return {
            seriesBarDistance: 10,
            axisX: {
                showGrid: true
            },
            axisY:{
                showGrid: true
            },
            height: "285px",
            low: 0
        };
    }
    getChartResponsiveBar() {
        return [
            [
                'screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }
            ]
        ];
    }


    render() {
        var AltitudeProfile = <div>
            <ChartistGraph
                data={this.getChartData()}
                type="Line"
                options={this.getChartOptionsBar()}
                responsiveOptions={this.getChartResponsiveBar()}
            />
        </div>;
        return (AltitudeProfile);
    }
}

export default connect(mapStateToProps)(AltitudeProfile);
