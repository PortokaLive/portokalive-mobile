import { Store } from "../Store";
import { SET_CURRENT_USER } from "./Types";

export const setCurrentUser = (user: any) => {
  Store.dispatch({
    type: SET_CURRENT_USER,
    paylod: user,
  });
};

export const logoutUser = () => {
  setCurrentUser({});
};
