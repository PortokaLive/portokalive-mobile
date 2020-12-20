import { Action } from "../../../models/Action";
import {
  LIVE_LISTS,
  LIVE_LISTS_INCREMENT,
  SET_CURRENT_LIVE,
} from "../actions/Types";

const initialState = {
  liveList: [] as any[],
  currentLive: {},
};

export const ReducerLive = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case LIVE_LISTS:
      return { ...state, liveList: action.payload };
    case LIVE_LISTS_INCREMENT:
      return { ...state, liveList: [...state.liveList, ...action.payload] };
    case SET_CURRENT_LIVE:
      return { ...state, currentLive: action.payload };
    default:
      return state;
  }
};
