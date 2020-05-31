import { Store } from "../Store";
import {
  SET_CURRENT_USER,
  GLOBAL_ERROR,
  GLOBAL_SUCCESS,
  ACTIVATION_REQUIRED,
} from "./Types";
import { User } from "../../../models/User";
import { setItem, removeItem } from "../../helpers/AsyncStorageHelper";
import JwtDecode from "jwt-decode";
import { Action } from "../../../models/Action";
import { GlobalError } from "../../../models/Error";
import { httpGet, httpPost } from "../../helpers/AxiosHelper";
import { GlobalSuccess } from "../../../models/Success";
import { clearActivation } from "./ActionSuccess";

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
      setCurrentUser(decoded);
    }
  } catch (ex) {
    if (!ex) {
      return;
    }
    if (ex!.response!.data!.error === ACTIVATION_REQUIRED) {
      Store.dispatch({
        type: ACTIVATION_REQUIRED,
        payload: {
          email: user.email,
        },
      });
    } else {
      Store.dispatch({
        type: GLOBAL_ERROR,
        payload: new GlobalError(
          ex?.response?.status,
          "Login failed",
          "Invalid credentials"
        ),
      } as Action<GlobalError>);
    }
  }
};

export const setCurrentUser = (user: any) => {
  Store.dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  } as Action<any>);
};

export const logoutUser = (navigation: any) => {
  removeItem("token");
  setCurrentUser(null);
  clearActivation();
  navigation.navigate("Logout");
};

export const registerUser = async (user: User) => {
  try {
    const response = await httpPost("user/register", user);
    if (!response) {
      return;
    }
    if (response.data && response.data.result) {
      Store.dispatch({
        type: ACTIVATION_REQUIRED,
        payload: {
          email: user.email,
        },
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
        "Registeration failed",
        ex?.response?.data?.message
      ),
    } as Action<GlobalError>);
  }
};

export const activateAccount = async (
  email: string,
  activationCode: string
) => {
  try {
    const response = await httpPost("/user/activate", {
      email,
      activationCode,
    });
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
      setTimeout(() => {
        setCurrentUser(decoded);
      }, 1000);
    }
  } catch (ex) {
    if (!ex) {
      return;
    }
    Store.dispatch({
      type: GLOBAL_ERROR,
      payload: new GlobalError(
        ex?.response?.status,
        "Activation failed",
        ex?.response?.data?.message
      ),
    } as Action<GlobalError>);
  }
};

export const resendActivation = async (email: string) => {
  try {
    const response = await httpPost("/user/sendActivationEmail", { email });
    if (!response) {
      return;
    }
    if (response.data && response.data.result) {
      Store.dispatch({
        type: GLOBAL_SUCCESS,
        payload: new GlobalSuccess(200, "Success", response.data.result),
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
        "Resending verification failed",
        ex?.response?.data?.message
      ),
    } as Action<GlobalError>);
  }
};
