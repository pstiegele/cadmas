import React, { Component } from 'react';
import fi_box from 'assets/img/flightinstruments/fi_box.svg';
import horizon_back from 'assets/img/flightinstruments/horizon_back.svg';
import horizon_ball from 'assets/img/flightinstruments/horizon_ball.svg';
import horizon_circle from 'assets/img/flightinstruments/horizon_circle.svg';
import horizon_mechanics from 'assets/img/flightinstruments/horizon_mechanics.svg';
import fi_circle from 'assets/img/flightinstruments/fi_circle.svg';

export class Attitude extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.pitch!==nextProps.pitch||this.props.roll!==nextProps.roll||this.props.size!==nextProps.size||this.props.showBox!==nextProps.showBox){
            return true;
        }else{
            return false;
        }
    }

    pitch_bound = 30;

    setRoll(roll){
        roll=roll*(180/Math.PI);
        if(roll===undefined)
        roll=0;
        return {transform: "rotate("+(-roll)+"deg)",transition: "1s ease-in-out"};
    }

    setPitch(pitch){
        pitch=pitch*(180/Math.PI);
        if(pitch===undefined)
        pitch=0;
        
        if(pitch>this.pitch_bound){
            pitch=this.pitch_bound;
        }else if(pitch< -this.pitch_bound){
            pitch=-this.pitch_bound;
        }
        return {top: pitch*0.7+"%",transition: "1s ease-in-out"};
    }

    setSize(size){
        if(size===undefined)
            size=100;
        return {height : size, width : size};
    }

    showBox(showBox){
        if(showBox===undefined){
            showBox=true;
        }
        if(showBox){
            return {display: "inherit"};
        }else{
            return {display: "none"};
        }
        
    }

    render() {
        return (
            <div className="instrument attitude" style={this.setSize(this.props.size)}>
                <img src={fi_box} className="background box" alt="" style={this.showBox(this.props.showBox)}/>
                <div className="roll box" style={this.setRoll(this.props.roll)}>
                    <img src={horizon_back} className="box" alt="" />
                    <div className="pitch box" style={this.setPitch(this.props.pitch)}>
                        <img src={horizon_ball} className="box" alt="" />
                    </div>
                    <img src={horizon_circle} className="box" alt="" />
                </div>
                <div className="mechanics box">
                    <img src={horizon_mechanics} className="box" alt="" />
                    <img src={fi_circle} className="box" alt="" />
                </div>
            </div>
        );
    }
}

export default Attitude;
