import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import horizon_back from 'assets/img/flightinstruments/horizon_back.svg';
import horizon_ball from 'assets/img/flightinstruments/horizon_ball.svg';
import horizon_circle from 'assets/img/flightinstruments/horizon_circle.svg';
import horizon_mechanics from 'assets/img/flightinstruments/horizon_mechanics.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';
import altitude_pressure from 'assets/img/flightinstruments/altitude_pressure.svg';
import altitude_ticks from 'assets/img/flightinstruments/altitude_ticks.svg';
import fi_needle_small from 'assets/img/flightinstruments/fi_needle_small.svg';
import fi_needle from 'assets/img/flightinstruments/fi_needle.svg';

export class Altimeter extends Component {
    constructor(props) {
        super(props);
    }

    setPressure(pressure) {
        if (pressure === undefined)
            pressure = 0;
        pressure = 2 * pressure - 1980;
        return { transform: "rotate(" + pressure + "deg)",transition: "0.5s ease-in-out"  };
    }

    setAltitudeBig(altitude) {
        if (altitude === undefined)
            altitude = 0;
        var needle = 90 + altitude % 1000 * 360 / 1000;
        return { transform: "rotate(" + needle + "deg)",transition: "0.5s ease-in-out"  };
    }
    setAltitudeSmall(altitude) {
        if (altitude === undefined)
            altitude = 0;
        var needleSmall = altitude / 10000 * 360;
        return { transform: "rotate(" + needleSmall + "deg)",transition: "0.5s ease-in-out"  };
    }

    setSize(size) {
        if (size === undefined)
            size = 100;
        return { height: size, width: size };
    }

    showBox(showBox) {
        if (showBox === undefined) {
            showBox = true;
        }
        if (showBox) {
            return { display: "inherit" };
        } else {
            return { display: "none" };
        }

    }

    render() {
        return (
            <div className="instrument altimeter" style={this.setSize(this.props.size)}>
                <img src={fi_box} className="background box" alt="" style={this.showBox(this.props.showBox)} />
                <div className="pressure box" style={this.setPressure(this.props.pressure)}>
                    <img src={altitude_pressure} className="box" alt="" />
                </div>
                <img src={altitude_ticks} className="box" alt="" />
                <div className="needleSmall box" style={this.setAltitudeSmall(this.props.altitude)}>
                    <img src={fi_needle_small} className="box" alt="" />
                </div>
                <div className="needle box" style={this.setAltitudeBig(this.props.altitude)}>
                    <img src={fi_needle} className="box" alt="" />
                </div>
                <div className="mechanics box">
                    <img src={fi_circle} className="box" alt="" />
                </div>
            </div>
        );
    }
}

export default Altimeter;
