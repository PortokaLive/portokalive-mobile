import { combineReducers } from "redux";
import { ReducerAuth } from "./ReducerAuth";

export const rootReducers = combineReducers({
  auth: ReducerAuth,
});