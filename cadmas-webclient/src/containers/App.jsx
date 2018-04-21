import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import { style } from "variables/Variables.jsx";

import appRoutes from 'routes/app.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null
    };
    var token = localStorage.getItem("token");
    if (token) {

      var exampleSocket = new WebSocket("ws://localhost/client?token="+token, token);
      exampleSocket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        switch (msg.method) {
          case "authentication":
            if (msg.payload.successful) {
              localStorage.setItem('token', msg.payload.token);
              //document.getElementsByClassName("numbers")[0].innerHTML = new Date();
              console.log("authenticated successfully");

            } else {
              console.log("authentication failed");
            }
            break;
          case "addMissionACK":
            //console.log('addMissionACK');
            
            break;

          case "dataUsage":

            break;

          default:
            break;
        }

        console.log("ws received: " + msg.method);
      }
      exampleSocket.onopen = function (event) {
        var msg = {
          "method": "addMission",
          "payload": {
            "name": "MyCadmasMission",
            "note": "First web Mission",
            "onConnectionLostMode": "LAND"
          }
        };
        exampleSocket.send(JSON.stringify(msg));
        console.log("addMission sent");
        
      };

    }
  }
  handleNotificationClick(position) {
    this.state._notificationSystem.addNotification({
      title: (<span data-notify="icon" className="pe-7s-gift"></span>), message: (<div>
        Welcome to
      <b>&nbsp;CADMAS&nbsp;</b>
        - a cloudbased drone management suite.
    </div>), level: 'warning', position: position, autoDismiss: 15
    });
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    //var _notificationSystem = this.refs.notificationSystem;
    // _notificationSystem.addNotification({title: (<span data-notify="icon" className="pe-7s-gift"></span>), message: (<div>
    //   Welcome to
    //   <b>&nbsp;CADMAS&nbsp;</b>
    //   - a cloudbased drone management suite.
    // </div>), level: 'info', position: "tr", autoDismiss: 15});
  }
  componentDidUpdate(e) {
    if (window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
      document.documentElement.classList.toggle('nav-open');
    }
  }
  render() {
    return (<div className="wrapper">
      <NotificationSystem ref="notificationSystem" style={style} />
      <Sidebar {...this.props} />
      <div id="main-panel" className="main-panel">
        <Header {...this.props} />
        <Switch>
          {
            appRoutes.map((prop, key) => {
              if (prop.name === "Notifications")
                return (<Route path={prop.path} key={key} render={routeProps => <prop.component {...routeProps} handleClick={this.handleNotificationClick} />} />);
              if (prop.redirect)
                return (<Redirect from={prop.path} to={prop.to} key={key} />);
              return (<Route path={prop.path} component={prop.component} key={key} />);
            })
          }
        </Switch>
        <Footer />
      </div>
    </div>);
  }
}

export default App;
