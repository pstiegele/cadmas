import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import horizon_back from 'assets/img/flightinstruments/horizon_back.svg';
import horizon_ball from 'assets/img/flightinstruments/horizon_ball.svg';
import horizon_circle from 'assets/img/flightinstruments/horizon_circle.svg';
import horizon_mechanics from 'assets/img/flightinstruments/horizon_mechanics.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';
import heading_yaw from 'assets/img/flightinstruments/heading_yaw.svg';
import heading_mechanics from 'assets/img/flightinstruments/heading_mechanics.svg';

export class Heading extends Component {
    constructor(props) {
        super(props);
    }
    
    setHeading(heading) {
        heading = heading* (180/Math.PI);
        if(heading===undefined)
            heading=0;
        return { transform: 'rotate('+ -heading + 'deg)',transition: "0.5s ease-in-out" };
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
            <div className="instrument heading" style={this.setSize(this.props.size)}>
                <img src={fi_box} className="background box" alt="" style={this.showBox(this.props.showBox)}/>
                <div className="heading box" style={this.setHeading(this.props.heading)}>
                    <img src={heading_yaw} className="box" alt="" />
                </div>
                <div className="mechanics box">
                    <img src={heading_mechanics} className="box" alt="" />
                    <img src={fi_circle} className="box" alt="" />
                </div>
            </div>
        );
    }
}

export default Heading;
