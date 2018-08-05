import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import MissionSummary from 'components/MissionSummary/MissionSummary';

const mapStateToProps = (state) => {
  return { user: state.user, mission: state.mission, activity: state.activity };
};


class ActivitySummary extends Component {
  componentDidMount() {

  }

  getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }

  getMissionByID(missionID) {
    var result = this.props.mission.missions.filter(function (obj) {
      return obj.missionID === missionID;
    });
    return result[0];
  }

  getSafeMissionID() {
    return this.getSafe(() => this.props.activityToShow.missionID, 0)
  }

  getSafeMission() {
    return this.getSafe(() => this.getMissionByID(this.getSafeMissionID()), this.props.mission.missions[0]);
  }

  getDistance() {
    var mission = this.getSafeMission();
    if (mission !== undefined && mission.distance !== undefined && mission.distance !== null) {
      var d = mission.distance;
      if (d > 1000) {
        return (mission.distance / 1000).toFixed(2) + " km";
      } else {
        return Math.round(mission.distance) + " m";
      }

    }
    return "-";
  }

  getNumberOfWaypoints() {
    var mission = this.getSafeMission();
    if (mission !== undefined && mission.route !== undefined && mission.route !== null) {
      return mission.route.length + " waypoints";
    }
    return "-";
  }

  getRelativeOrAbsoluteDate() {
    var activity = this.props.activityToShow;
    if (activity !== undefined && activity.dt_created !== undefined) {
      var date = activity.dt_created;
      if (new Date() - new Date(date * 1000) < 604800000) {
        return moment(date * 1000).fromNow();
      } else {
        return moment(date * 1000).locale("de", localization).format("LL")
      }
    }
    return "-";
  }

  getSafeNote() {
    var mission = this.getSafeMission();
    if (mission !== undefined && mission.note !== undefined && mission.note !== "") {
      return mission.note;
    }
    return "nothing noted";
  }
  getLocation() {
    var mission = this.getSafeMission();
    if (mission !== undefined && mission.location !== undefined && mission.location !== null) {
      return mission.location;
    }
    return "-";
  }

  getUsage() {
    var mission = this.getSafeMission();
    var counter = 0;
    if (mission !== undefined && mission.missionID !== undefined) {
      for (var i = 0; i < this.props.activity.activities.length; i++) {
        if (this.props.activity.activities[i].missionID === mission.missionID) {
          counter++
        }
      }
    }
    if (counter === 1) {
      return counter + " activity";
    } else {
      return counter + " activities";
    }
  }

  getSafeActivityState() {
    return this.getSafe(() => this.state.activityToShow.state, 0);
  }

  render() {
    if (this.getSafeActivityState() === 0) {
      return <MissionSummary missionToShow={this.getSafeMission()} />;
    }
    var ActivitySummary = <div>
      <div>
        <p>
          <i className="fa fa-calendar"></i>
          &nbsp;&nbsp;{this.getRelativeOrAbsoluteDate()}</p>
      </div>
      <div>
        <p>
          <i className="fa fa-globe"></i>
          &nbsp;&nbsp;{this.getLocation()}</p>
      </div>

      <div>
        <p>
          <i className="fa fa-road"></i>
          &nbsp;&nbsp;{this.getDistance()}</p>
      </div>
      <div>
        <p>
          <i className="fa fa-map-marker"></i>
          &nbsp;&nbsp;{this.getNumberOfWaypoints()}</p>
      </div>
      <div>
        <p>
          <i className="fa fa-plane"></i>
          &nbsp;&nbsp;{this.getUsage()}</p>
      </div>
      <div>
        <p>
          <i className="fa fa-sticky-note"></i>
          &nbsp;&nbsp;{this.getSafeNote()}</p>
      </div>


    </div>;
    return (ActivitySummary);
  }
}

export default connect(mapStateToProps)(ActivitySummary);
