import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";

import ws from "./reducers/wsReducer";
import user from "./reducers/userReducer";

export default createStore(combineReducers({ws, user}), {}, applyMiddleware(logger));
