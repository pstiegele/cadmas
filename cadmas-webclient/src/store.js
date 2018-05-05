import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import ws from "./reducers/wsReducer";
import user from "./reducers/userReducer";
import activity from "./reducers/activityReducer";
import drone from "./reducers/droneReducer";
import mission from "./reducers/missionReducer";
import notification from "./reducers/notificationReducer";
import payload from "./reducers/payloadReducer";
import payloadDevice from "./reducers/payloadDeviceReducer";

export default createStore(combineReducers({ ws, user, activity, drone, mission, notification, payload, payloadDevice }), {}, applyMiddleware(logger));
