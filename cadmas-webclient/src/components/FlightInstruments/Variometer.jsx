import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import horizon_back from 'assets/img/flightinstruments/horizon_back.svg';
import horizon_ball from 'assets/img/flightinstruments/horizon_ball.svg';
import horizon_circle from 'assets/img/flightinstruments/horizon_circle.svg';
import horizon_mechanics from 'assets/img/flightinstruments/horizon_mechanics.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';
import vertical_mechanics from 'assets/img/flightinstruments/vertical_mechanics.svg';
import fi_needle from 'assets/img/flightinstruments/fi_needle.svg';

export class Variometer extends Component {
    constructor(props) {
        super(props);
    }

    vario_bound = 1.95;
    setVario(vario) {
        if (vario === undefined)
            vario = 0;
        if (vario > this.vario_bound)
            vario = this.vario_bound;
        else if (vario < -this.vario_bound)
            vario = -this.vario_bound;
        vario = vario * 90;
        return { transform: "rotate(" + vario + "deg)",transition: "0.5s ease-in-out" };
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
            <div class="instrument vario" style={this.setSize(this.props.size)}>
                <img src={fi_box} class="background box" alt="" style={this.showBox(this.props.showBox)} />
                <img src={vertical_mechanics} class="box" alt=""/>
                <div class="vario box"  style={this.setVario(this.props.vario)} >
                    <img src={fi_needle} class="box" alt="" />
                </div>
                <div class="mechanics box">
                    <img src={fi_circle} class="box" alt="" />
                </div>
            </div>
        );
    }
}

export default Variometer;
