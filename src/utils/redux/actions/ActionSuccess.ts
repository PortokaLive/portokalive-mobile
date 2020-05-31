import { Store } from "../Store";
import { GLOBAL_SUCCESS, ACTIVATION_REQUIRED } from "./Types";
import { GlobalSuccess } from "../../../models/Success";
import { Action } from "../../../models/Action";

export const clearSuccess = () => {
  Store.dispatch({
    type: GLOBAL_SUCCESS,
    payload: new GlobalSuccess(),
  } as Action<GlobalSuccess>);
};

export const clearActivation = () => {
  Store.dispatch({
    type: ACTIVATION_REQUIRED,
    payload: false,
  });
};
