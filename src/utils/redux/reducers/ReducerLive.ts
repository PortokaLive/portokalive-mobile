import { Action } from "../../../models/Action";
import { LIVE_LISTS } from "../actions/Types";

const initialState = {
  liveList: [] as any[],
};

export const ReducerLive = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case LIVE_LISTS:
      return { ...state, liveList: action.payload };
    default:
      return state;
  }
};
