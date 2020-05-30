import { Store } from "../Store";
import { SET_CURRENT_USER, GLOBAL_ERROR } from "./Types";
import { User } from "../../../models/User";
import { AxiosClient } from "../AxiosClient";
import { setItem, removeItem } from "../../helpers/AsyncStorageHelper";
import JwtDecode from "jwt-decode";
import { Action } from "../../../models/Action";
import { GlobalError } from "../../../models/Error";
import { clearError } from "./ActionError";
import { httpGet, httpPost } from "../../helpers/AxiosHelper";

export const loginUser = async (user: User) => {
  try {
    const response = await httpPost("user/login", user);
    if (!response) {
      return;
    }
    if (
      response.data &&
      response.data.result === "SUCCESS" &&
      response.data.token
    ) {
      const decoded = JwtDecode(response.data.token);
      setItem("token", response.data.token);
      Store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
    }
  } catch (ex) {
    if (!ex) {
      return;
    }
    Store.dispatch({
      type: GLOBAL_ERROR,
      payload: new GlobalError(
        ex?.response?.status,
        "Login failed",
        "Invalid credentials"
      ),
    } as Action<GlobalError>);
  }
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
