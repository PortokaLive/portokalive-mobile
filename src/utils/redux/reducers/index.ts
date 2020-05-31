import { combineReducers } from "redux";
import { ReducerAuth } from "./ReducerAuth";
import { ReducerError } from "./ReducerError";
import { ReducerSuccess } from "./ReducerSuccess";

export const rootReducers = combineReducers({
  auth: ReducerAuth,
  globalError: ReducerError,
  globalSuccess: ReducerSuccess,
});
