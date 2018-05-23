import React, { Component } from 'react';

import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';
import altitude_absolute from 'assets/img/flightinstruments/altitude_absolute.svg';
import altitude_ticks from 'assets/img/flightinstruments/altitude_ticks.svg';
import fi_needle_small from 'assets/img/flightinstruments/fi_needle_small.svg';
import fi_needle from 'assets/img/flightinstruments/fi_needle.svg';

export class Altimeter extends Component {
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.absoluteAltitude!==nextProps.absoluteAltitude||this.props.altitude!==nextProps.altitude||this.props.size!==nextProps.size||this.props.showBox!==nextProps.showBox){
            return true;
        }else{
            return false;
        }
    }


    oldValue=0;
    rotateShortestWay(newValue) {
        var aR;
        aR = this.oldValue % 360;
        if ( aR < 0 ) { aR += 360; }
        if ( aR < 180 && (newValue > (aR + 180)) ) { this.oldValue -= 360; }
        if ( aR >= 180 && (newValue <= (aR - 180)) ) { this.oldValue += 360; }
        this.oldValue += (newValue - aR);
        return this.oldValue;
    }

    setAbsoluteAltitude(absoluteAltitude) {
        if (absoluteAltitude === undefined)
        absoluteAltitude = 0;
        absoluteAltitude = 70 - absoluteAltitude / 5;
        return { transform: "rotate(" + absoluteAltitude + "deg)", transition: "1s ease-in-out" };
    }

    setAltitudeBig(altitude) {
        if (altitude === undefined)
            altitude = 0;
        var needle = 90 + altitude % 100 * 360 / 100;
        return { transform: "rotate(" + this.rotateShortestWay(needle) + "deg)", transition: "1s ease-in-out" };
    }
    setAltitudeSmall(altitude) {
        if (altitude === undefined)
            altitude = 0;
        var needleSmall = altitude / 1000 * 360;
        return { transform: "rotate(" + needleSmall + "deg)", transition: "1s ease-in-out" };
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
                <div className="absoluteAltitude box" style={this.setAbsoluteAltitude(this.props.absoluteAltitude)}>
                    <img src={altitude_absolute} className="box" alt="" />
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
