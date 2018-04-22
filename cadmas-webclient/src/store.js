import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";

import ws from "./reducers/wsReducer";
import user from "./reducers/userReducer";
import activity from "./reducers/activityReducer";

export default createStore(combineReducers({ws, user, activity}), {}, applyMiddleware(logger));
