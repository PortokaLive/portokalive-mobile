import { Store } from "../Store";
import { SET_CURRENT_USER } from "./Types";
import { User } from "../../../models/User";
import { AxiosClient } from "../AxiosClient";

export const loginUser = (user: User) => {
}

export const setCurrentUser = (user: any) => {
  Store.dispatch({
    type: SET_CURRENT_USER,
    paylod: user,
  });
};

export const logoutUser = () => {
  setCurrentUser({});
};
