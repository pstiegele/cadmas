import React, { Component } from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { user: state.user, mission: state.mission };
};


class MissionSummary extends Component {
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
    var MissionSummary = <div>
      <div className="row">
        <div className="col-lg-8">
          {this.props.showMissionName ?
            <div>
              <p>
                <i className="fa fa-globe"></i>
                &nbsp;&nbsp;{this.getSafe(() => this.props.missionToShow.name, "")}</p>
            </div> : ""}
          <div>
            <p>
              <i className="fa fa-road"></i>
              &nbsp;&nbsp;17,4 km</p>
          </div>


          <div>
            <p>
              <i className="fa fa-image"></i>
              &nbsp;&nbsp;87 photo waypoints</p>
          </div>

        </div>

      </div>
    </div>;
    return (MissionSummary);
  }
}

export default connect(mapStateToProps)(MissionSummary);
