import { createStore, combineReducers, applyMiddleware } from "redux";
import ws from "./reducers/wsReducer";
import user from "./reducers/userReducer";
import activity from "./reducers/activityReducer";
import drone from "./reducers/droneReducer";
import mission from "./reducers/missionReducer";
import notification from "./reducers/notificationReducer";
import payload from "./reducers/payloadReducer";
import payloadDevice from "./reducers/payloadDeviceReducer";
import telemetry from "./reducers/telemetryReducer";
const middlewares = [];
if (process.env.REACT_APP_DEVELOPMENT === "true") {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
  }
export default createStore(combineReducers({ ws, user, activity, drone, mission, notification, payload, payloadDevice, telemetry }), {}, applyMiddleware(...middlewares));
