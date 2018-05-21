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

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.vario!==nextProps.vario||this.props.size!==nextProps.size||this.props.showBox!==nextProps.showBox){
            return true;
        }else{
            return false;
        }
    }

    vario_bound = 19.5;
    setVario(vario) {
        if (vario === undefined)
            vario = 0;
        if (vario > this.vario_bound)
            vario = this.vario_bound;
        else if (vario < -this.vario_bound)
            vario = -this.vario_bound;
        vario = vario * 9;
        return { transform: "rotate(" + vario + "deg)",transition: "1s ease-in-out" };
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
            <div className="instrument vario" style={this.setSize(this.props.size)}>
                <img src={fi_box} className="background box" alt="" style={this.showBox(this.props.showBox)} />
                <img src={vertical_mechanics} className="box" alt=""/>
                <div className="vario box"  style={this.setVario(this.props.vario)} >
                    <img src={fi_needle} className="box" alt="" />
                </div>
                <div className="mechanics box">
                    <img src={fi_circle} className="box" alt="" />
                </div>
            </div>
        );
    }
}

export default Variometer;
