import { combineReducers } from "redux";
import auth from "./auth";
import task from "./task";
import agent from "./agent";
import list from "./list";
const rootReducer = combineReducers({
  auth,
  task,
  agent,
  list,
});

export default rootReducer;
