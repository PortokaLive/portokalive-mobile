import { SET_CURRENT_USER } from "../actions/Types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const ReducerAuth = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    default:
      return state;
  }
};
