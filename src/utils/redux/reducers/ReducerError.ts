import { Action } from "../../../models/Action";
import { GLOBAL_ERROR } from "../actions/Types";
import { GlobalError } from "../../../models/Error";

export const ReducerError = (
  state = new GlobalError(),
  action: Action<GlobalError>
) => {
  switch (action.type) {
    case GLOBAL_ERROR:
      return action.payload;
    default:
      return state;
  }
};
