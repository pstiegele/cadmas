import React, { Component } from 'react';

import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';
import heading_yaw from 'assets/img/flightinstruments/heading_yaw.svg';
import heading_mechanics from 'assets/img/flightinstruments/heading_mechanics.svg';

export class Heading extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.heading!==nextProps.heading||this.props.size!==nextProps.size||this.props.showBox!==nextProps.showBox){
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

    setHeading(heading) {
        heading = heading* (180/Math.PI);
        if(heading===undefined)
            heading=0;
        if(heading < this.lastHeading)
            this.headingMultiplicator++;
        return { transform: 'rotate('+ this.rotateShortestWay(-heading) + 'deg)',transition: "1s ease-in-out" };
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
