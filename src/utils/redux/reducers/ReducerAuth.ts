import { SET_CURRENT_USER, ACTIVATION_REQUIRED } from "../actions/Types";

const initialState = {
  isAuthenticated: false,
  activation: {
    isActivationRequired: false,
    email: "",
  },
  user: {},
};

export const ReducerAuth = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    case ACTIVATION_REQUIRED:
      return {
        ...state,
        activation: {
          ...state.activation,
          isActivationRequired: !!action.payload,
          email: action.payload!.email,
        },
      };
    default:
      return state;
  }
};
