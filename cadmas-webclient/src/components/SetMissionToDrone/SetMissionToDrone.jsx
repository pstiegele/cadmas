import React, { Component } from 'react';
// import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
// import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import CustomCheckbox from 'elements/CustomCheckbox/CustomCheckbox';


const mapStateToProps = (state) => {
  return { mission: state.mission, drone: state.drone };
};


class SetMissionToDrone extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  
  }
  
  getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  render() {
    return <div className="content">
                    {this.props.drone.drones.map((prop, key) => {
                      return <div key={prop.droneID+"-droneID"}><CustomCheckbox isChecked={true} number={key} label={prop.name} inline={false} /></div>;
                    })
                    }
                  </div>
  }
}

export default connect(mapStateToProps)(SetMissionToDrone);
