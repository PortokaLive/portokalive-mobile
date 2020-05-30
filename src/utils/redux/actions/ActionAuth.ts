import { Store } from "../Store";
import { SET_CURRENT_USER, GLOBAL_ERROR } from "./Types";
import { User } from "../../../models/User";
import { AxiosClient } from "../AxiosClient";
import { setItem, removeItem } from "../../helpers/AsyncStorageHelper";
import JwtDecode from "jwt-decode";
import { Action } from "../../../models/Action";
import { GlobalError } from "../../../models/Error";
import { clearError } from "./ActionError";

export const loginUser = (user: User) => {
  AxiosClient.post("user/login", user)
    .then((response) => {
      if (
        response.data &&
        response.data.result === "SUCCESS" &&
        response.data.token
      ) {
        setItem("token", response.data.token);
        const decoded = JwtDecode(response.data.token);
        Store.dispatch({
          type: SET_CURRENT_USER,
          payload: decoded,
        } as Action<any>);
      }
    })
    .catch((err) => {
      Store.dispatch({
        type: GLOBAL_ERROR,
        payload: new GlobalError(
          err?.response?.status,
          "Login failed",
          "Invalid credentials"
        ),
      } as Action<GlobalError>);
    });
};

export const setCurrentUser = (user: any) => {
  Store.dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  } as Action<any>);
};

export const logoutUser = () => {
  removeItem("token");
  setCurrentUser(null);
};
