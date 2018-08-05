import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/de'
import { Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return { user: state.user, mission: state.mission, drone: state.drone, activity: state.activity, notification: state.notification };
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

  getCreateOrStartDate() {
    var activity = this.props.activityToShow;
    if (activity !== undefined) {
      if (activity.dt_started) {
        if (new Date() - new Date(activity.dt_started * 1000) < 604800000) {
          return "started " + moment(activity.dt_started * 1000).fromNow();
        } else {
          return "started on " + moment(activity.dt_started * 1000).locale("de", localization).format("LL")
        }
      } else if (activity.dt_created) {
        if (new Date() - new Date(activity.dt_created * 1000) < 604800000) {
          return "created " + moment(activity.dt_created * 1000).fromNow();
        } else {
          return "created on " + moment(activity.dt_created * 1000).locale("de", localization).format("LL")
        }
      }
    }
  }

  getSafeNote() {
    if (this.props.activityToShow !== undefined && this.props.activityToShow.note !== undefined && this.props.activityToShow.note !== "") {
      return this.props.activityToShow.note;
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

  getDuration() {
    var activity = this.props.activityToShow;
    if (activity && activity.dt_started && activity.dt_ended) {
      var duration = activity.dt_ended - activity.dt_started;
      if (moment.duration(duration * 1000).asSeconds() > 60) {
        if (moment.duration(duration * 1000).asMinutes() > 60) {
          if (moment.duration(duration * 1000).asHours() > 24) {
            return Math.round(moment.duration(duration * 1000).asDays()) + " days";
          } else {
            return Math.round(moment.duration(duration * 1000).asHours()) + " hours";
          }
        } else {
          return Math.round(moment.duration(duration * 1000).asMinutes()) + " min";
        }
      } else {
        return Math.round(moment.duration(duration * 1000).asSeconds()) + " s";
      }
    }
  }

  getSafeActivityState() {
    return this.getSafe(() => this.props.activityToShow.state, 0);
  }

  getName() {
    var actName = this.getSafe(() => this.props.activityToShow.name, null);
    return actName;
  }

  getSafeMissionName() {
    return this.getSafe(() => this.getMissionByID(this.props.activityToShow.missionID).name, 0);
  }

  getState() {
    var state = this.getSafeActivityState();
    switch (state) {
      case "0":
        return <div>
          <p>
            <i className="fa fa-circle" key={"activityStatus"}></i>
            &nbsp;&nbsp;{"activity has not started yet."}</p>
        </div>;


      case "1":
        return <div>
          <p>
            <i className="fa fa-circle" style={{ color: "red" }} key={"activityStatus"}></i>&nbsp;&nbsp;{"activity is currently live"}</p>
        </div>;


      case "2":
        return <div>
          <p>
            <i className="fa fa-circle" style={{ color: "green" }} key={"activityStatus"}></i>&nbsp;&nbsp;{"activity was successfully completed"}</p>
        </div>;
      default:
        break;
    }
  }

  getDroneName() {
    if (this.props.activityToShow != null) {
      return this.getSafe(() => this.props.drone.drones[this.props.activityToShow.droneID].name, null);
    }
  }

  getNumberOfNotifications() {
    if (this.props.activityToShow != null) {
      var not = this.props.notification.notifications.filter(notification => notification.activityID === this.props.activityToShow.activityID);
      return not.length;
    }
  }

  // getRoute() {
  //   var c = document.getElementsByClassName("activityPath")[0];
  //   if (c !== null && c !== undefined && this.props.activityToShow != null && this.getSafeMission() != null && this.getSafeMission().route != null) {
  //     console.log("here we are");
  //     // c.style.display = "inline-block";
  //     var ctx = c.getContext("2d");
  //     ctx.fillStyle = "rgb(139, 195, 74)";
  //     ctx.strokeStyle = "#8bc34a";
  //     ctx.lineCap = "round";
  //     ctx.shadowBlur = 0;
  //     ctx.shadowColor = "black";
  //     ctx.lineWidth = 3;
  //     var route = this.getSafeMission().route;
  //     var smallestX = 1e8;
  //     var smallestY = 1e8;
  //     var biggestX = -1e8;
  //     var biggestY = -1e8;
  //     //kleinsten x und y wert rausfinden
  //     for (let i = 0; i < route.length; i++) {
  //       if (route[i].x < smallestX) {
  //         smallestX = route[i].x;
  //       }
  //       if (route[i].y < smallestY) {
  //         smallestY = route[i].y;
  //       }
  //       if (route[i].x > biggestX) {
  //         biggestX = route[i].x;
  //       }
  //       if (route[i].y > biggestY) {
  //         biggestY = route[i].y;
  //       }
  //     }
  //     //gewünschte Breite / aktuelle Breite=Skalierungsfaktor
  //     //gewünschte Höhe / aktuelle Höhe=Skalierungsfaktor
  //     //kleinerer Skalierungsfaktor gewinnt
  //     var scalX = 60 / (biggestX - smallestX);
  //     var scalY = 300 / (biggestY - smallestY);
  //     var scal = scalX > scalY ? scalY : scalX;
  //     //kleinsten Wert abziehen
  //     for (let i = 0; i < route.length; i++) {
  //       route[i].x=(route[i].x - smallestX+3)*scal;
  //       route[i].y=(route[i].y - smallestY+3)*scal;
  //     }
  //     ctx.moveTo(route[0].x, route[0].y);
  //     for (let i = 1; i < route.length; i++) {
  //       console.log("waypoint no " + i + " x: " + route[i].x + " & y: " + route[i].y);
  //       ctx.lineTo(route[i].x, route[i].y);
  //     }
  //     ctx.stroke();
  //   }

  // }

  render() {
    var activitySummary = <div>
      {this.getName() !== null ? <div><p><i className="fa fa-flag"></i>&nbsp;&nbsp;{this.getName()}</p></div> : ""}
      {this.getState()}
      <div>
        <p>
          <i className="fa fa-calendar"></i>
          &nbsp;&nbsp;{this.getCreateOrStartDate()}</p>
      </div>
      {this.getDuration() !== undefined ? <div>
        <p>
          <i className="fa fa-clock"></i>
          &nbsp;&nbsp;{this.getDuration()}</p>
      </div> : ""}
      <div>
        <p>
          <i className="fa fa-compass"></i>
          &nbsp;&nbsp;{this.getSafeMissionName()}</p>
      </div>
      <div>
        <p>
          <i className="fa fa-plane"></i>
          &nbsp;&nbsp;{this.getDroneName()}</p>
      </div>
      <div>
        <p>
          <i className="fa fa-bell"></i>
          &nbsp;&nbsp;{this.getNumberOfNotifications() + " Notifications"}</p>
      </div>
      <div>
        <p>
          <i className="fa fa-sticky-note"></i>
          &nbsp;&nbsp;{this.getSafeNote()}</p>
      </div>


    </div>;
    //   return <div style={{ height: "420px" }}>
    //     <Col lg={9}>
    //       {activitySummary}
    //     </Col>
    //     <Col lg={3}>
    //       <canvas className="activityPath">{this.getRoute()}</canvas>
    //     </Col></div>;
    // }
    return activitySummary;
  }
}

export default connect(mapStateToProps)(ActivitySummary);
