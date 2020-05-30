import { combineReducers } from "redux";
import { ReducerAuth } from "./ReducerAuth";
import { ReducerError } from "./ReducerError";

export const rootReducers = combineReducers({
  auth: ReducerAuth,
  globalError: ReducerError,
});
