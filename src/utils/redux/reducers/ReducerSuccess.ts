import { Action } from "../../../models/Action";
import { GLOBAL_SUCCESS } from "../actions/Types";
import { GlobalSuccess } from "../../../models/Success";

export const ReducerSuccess = (
  state = new GlobalSuccess(),
  action: Action<GlobalSuccess>
) => {
  switch (action.type) {
    case GLOBAL_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
