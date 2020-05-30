import { Store } from "../Store";
import { GLOBAL_ERROR } from "./Types";
import { GlobalError } from "../../../models/Error";
import { Action } from "../../../models/Action";

export const clearError = () => {
  Store.dispatch({
    type: GLOBAL_ERROR,
    payload: new GlobalError(),
  } as Action<GlobalError>);
};
