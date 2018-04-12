import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import Activities from 'views/Activities/Activities';
import Typography from 'views/Typography/Typography';
import Icons from 'views/Icons/Icons';
import Maps from 'views/Maps/Maps';
import Notifications from 'views/Notifications/Notifications';
import Upgrade from 'views/Upgrade/Upgrade';
import Drones from 'views/Drones/Drones';
import Missions from 'views/Missions/Missions';

const appRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  }, {
    path: "/activities",
    name: "Activities",
    icon: "pe-7s-note2",
    component: Activities
  }, {
    path: "/missions",
    name: "Missions",
    icon: "pe-7s-arc",
    component: Missions
  }, {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  }, {
    path: "/drones",
    name: "Drones",
    icon: "pe-7s-plane",
    component: Drones
  }, {
    path: "/payloadDataCenter",
    name: "Payload Data Center",
    icon: "pe-7s-server",
    component: Typography
  }, {
    path: "/getDroneConnector",
    name: "Get Drone Connector",
    icon: "pe-7s-cloud-download",
    component: Icons
  }, {
    path: "/user",
    name: "User",
    icon: "pe-7s-user",
    component: UserProfile
  },
  // { upgrade: true, path: "/upgrade", name: "Upgrade to PRO", icon: "pe-7s-rocket", component: Upgrade },
  {
    redirect: true,
    path: "/",
    to: "/dashboard",
    name: "Dashboard"
  }
];

export default appRoutes;
