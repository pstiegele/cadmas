import React, { Component } from 'react';

import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';
import turn_coordinator from 'assets/img/flightinstruments/turn_coordinator.svg';
import fi_tc_airplane from 'assets/img/flightinstruments/fi_tc_airplane.svg';

export class TurnCoordinator extends Component {
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.turn!==nextProps.turn||this.props.size!==nextProps.size||this.props.showBox!==nextProps.showBox){
            return true;
        }else{
            return false;
        }
    }

    setTurn(turn) {
        turn = turn * (180/Math.PI);
        if (turn === undefined)
            turn = 0;
        return { transform: "rotate(" + turn + "deg)",transition: "1s ease-in-out" };
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
            <div className="instrument turn_coordinator" style={this.setSize(this.props.size)}>
                <img src={fi_box} className="background box" alt="" style={this.showBox(this.props.showBox)} />
                <img src={turn_coordinator} className="box" alt=""  />
                <div className="turn box" style={this.setTurn(this.props.turn)}>
                    <img src={fi_tc_airplane} className="box" alt="" />
                </div>
                <div className="mechanics box">
                    <img src={fi_circle} className="box" alt="" />
                </div>
            </div>
        );
    }
}

export default TurnCoordinator;
