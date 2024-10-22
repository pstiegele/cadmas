import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import Activities from 'views/Activities/Activities';
//import Typography from 'views/Typography/Typography';
//import Icons from 'views/Icons/Icons';
//import Maps from 'views/Maps/Maps';
import Notifications from 'views/Notifications/Notifications';
import Drones from 'views/Drones/Drones';
import Missions from 'views/Missions/Missions';
import Mission from 'views/Mission/Mission';
import Activity from 'views/Activity/Activity';
import Notification from 'views/Notification/Notification';
import PayloadDataCenter from 'views/PayloadDataCenter/PayloadDataCenter';
import GetDroneConnector from 'views/GetDroneConnector/GetDroneConnector';

const appRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    showInSidebar: true
  }, {
    path: "/activities",
    name: "Activities",
    icon: "pe-7s-note2",
    component: Activities,
    showInSidebar: true
  }, {
    path: "/missions",
    name: "Missions",
    icon: "pe-7s-arc",
    component: Missions,
    showInSidebar: true
  }, {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    showInSidebar: true
  }, {
    path: "/drones",
    name: "Drones",
    icon: "pe-7s-plane",
    component: Drones,
    showInSidebar: true
  }, {
    path: "/payloadDataCenter",
    name: "Payload Data Center",
    icon: "pe-7s-server",
    component: PayloadDataCenter,
    showInSidebar: true
  }, {
    path: "/getDroneConnector",
    name: "Get Drone Connector",
    icon: "pe-7s-cloud-download",
    component: GetDroneConnector,
    showInSidebar: true
  }, {
    path: "/user",
    name: "User",
    icon: "pe-7s-user",
    component: UserProfile,
    showInSidebar: true
  },
  {
    path: "/activity/:activityID",
    name: "Activity",
    icon: "pe-7s-note",
    component: Activity,
    showInSidebar: false
  },{
    path: "/mission/:missionID",
    name: "Mission",
    icon: "pe-7s-plane",
    component: Mission,
    showInSidebar: false
  },{
    path: "/notification/:notificationID",
    name: "Notification",
    icon: "pe-7s-bell",
    component: Notification,
    showInSidebar: false
  },
  {
    redirect: true,
    path: "/",
    to: "/dashboard",
    name: "Dashboard",
    showInSidebar: true
  }
];

export default appRoutes;
