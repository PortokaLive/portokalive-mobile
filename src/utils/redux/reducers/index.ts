import { combineReducers } from "redux";
import { ReducerAuth } from "./ReducerAuth";
import { ReducerError } from "./ReducerError";
import { ReducerLive } from "./ReducerLive";
import { ReducerSuccess } from "./ReducerSuccess";

export const rootReducers = combineReducers({
  auth: ReducerAuth,
  live: ReducerLive,
  globalError: ReducerError,
  globalSuccess: ReducerSuccess,
});
