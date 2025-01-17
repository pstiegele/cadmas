import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import LandingPage from 'components/LandingPage/LandingPage';

//import CadmasWS from '../websocket/CadmasWS';

import { style } from "variables/Variables.jsx";
import {connect} from "react-redux";
import {setWS} from "actions/wsActions";

import appRoutes from 'routes/app.jsx';





const mapStateToProps = (state) => {
  return {ws: state.ws};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWS: (ws) => {
      dispatch(setWS(ws));
    }
  };
};





class App extends Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null
    };

  }
  handleNotificationClick(position) {
    //this.cadmasWS.addMission("MyCadmasMission", "any note", "RTL");
    // for (var i = 0; i < 350; i++) {
    //   var activityID = Math.floor(Math.random() * (296 - 1 + 1) + 1);
    //   while (activityID < 119 && activityID > 17) {
    //     activityID = Math.floor(Math.random() * (296 - 1 + 1) + 1);
    //   }
    //   var payloadDevice = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    //   var size = Math.floor(Math.random() * (1073741824 - 1 + 1) + 1);

    //  // this.cadmasWS.addPayloadData(activityID, payloadDevice,0,"", size);

    // }
    // for(var i=0;i<8;i++){
    //  // var month = Math.floor(Math.random()*(12-1+1)+1);
    //  // var drone = Math.floor(Math.random()*(2-1+1)+1);
    //  var month = 4;
    //  var drone = 2;
    //   if(month<10){
    //     if(month<4){
    //       this.cadmasWS.addActivity("22", drone, "Testflight123", "1", "need more activities", "2018-0"+month+"-21 19:59:03", "2018-0"+month+"-21 20:36:11");
    //     }else{
    //       this.cadmasWS.addActivity("22", drone, "Testflight123", "1", "generate some statistics", "2017-0"+month+"-21 19:59:03", "2017-0"+month+"-21 20:36:11");
    //     }

    //   }else{
    //     this.cadmasWS.addActivity("22", drone, "Testflight123", "1", "generate some statistics", "2017-"+month+"-21 19:59:03", "2017-"+month+"-21 20:36:11");
    //   }

  
    
    

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
 // this.cadmasWS = new CadmasWS();
 // this.props.setWS(this.cadmasWS);

}
componentDidUpdate(e) {
  if (window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
    document.documentElement.classList.toggle('nav-open');
  }
}
render() {
  if(!localStorage.getItem("token")||localStorage.getItem("token")===undefined || localStorage.getItem("token")===null||localStorage.getItem("token")===""){
    return <LandingPage />;
  }
  return (<div className="wrapper">
    <NotificationSystem ref="notificationSystem" style={style} />
    <Sidebar {...this.props} />
    <div id="main-panel" className="main-panel">
      <Header {...this.props} />
      <Switch>
        {
          appRoutes.map((prop, key) => {
            // if (prop.name === "Notifications")
            //   return (<Route path={prop.path} key={key} render={routeProps => <prop.component {...routeProps} handleClick={this.handleNotificationClick} />} />);
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

