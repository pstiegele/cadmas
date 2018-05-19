import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import horizon_back from 'assets/img/flightinstruments/horizon_back.svg';
import horizon_ball from 'assets/img/flightinstruments/horizon_ball.svg';
import horizon_circle from 'assets/img/flightinstruments/horizon_circle.svg';
import horizon_mechanics from 'assets/img/flightinstruments/horizon_mechanics.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';
import fi_needle from 'assets/img/flightinstruments/fi_needle.svg';
import speed_mechanics from 'assets/img/flightinstruments/speed_mechanics.svg';

export class Airspeed extends Component {
    constructor(props) {
        super(props);
    }

    airspeed_bound_h = 160;
    airspeed_bound_l = 0;
    setAirspeed(speed) {
        if (speed === undefined)
            speed = 0;
        if (speed > this.airspeed_bound_h)
            speed = this.airspeed_bound_h;
        else if (speed < this.airspeed_bound_l)
            speed = this.airspeed_bound_l;

        speed = 90 + speed * 2;
        return { transform: "rotate(" + speed + "deg)",transition: "0.5s ease-in-out" };
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
            <div className="instrument airspeed" style={this.setSize(this.props.size)}>
                <img src={fi_box} className="background box" alt="" style={this.showBox(this.props.showBox)} />
                <img src={speed_mechanics} className="box" alt="" />
                <div className="speed box" style={this.setAirspeed(this.props.speed)}>
                    <img src={fi_needle} className="box" alt="" />
                </div>
                <div className="mechanics box">
                    <img src={fi_circle} className="box" alt="" />
                </div>
            </div>
        );
    }
}

export default Airspeed;