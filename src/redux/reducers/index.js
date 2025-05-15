import { combineReducers } from "redux";
import auth from "./auth";
import task from "./task";
import agent from "./agent";
const rootReducer = combineReducers({
  auth,
  task,
  agent,
});

export default rootReducer;
