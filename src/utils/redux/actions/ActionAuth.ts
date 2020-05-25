import { Store } from "../Store";

export const setCurrentUser = (user: any) => {
  Store.dispatch({
    type: "SET_CURRENT_USER",
    payload: user,
  });
};

export const logoutUser = () => {
  setCurrentUser({});
};
