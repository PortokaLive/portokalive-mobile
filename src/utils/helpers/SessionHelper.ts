import { getItem } from "./AsyncStorageHelper";
import jwtDecode from "jwt-decode";
import { setCurrentUser, logoutUser } from "../redux/actions/ActionAuth";
import { Store } from "../redux/Store";
import { GLOBAL_ERROR } from "../redux/actions/Types";
import { GlobalError } from "../../models/Error";
import { Action } from "../../models/Action";

export const checkPreviousSession = async () => {
  const token = await getItem("token");
  if (token) {
    const decoded = jwtDecode<any>(token);
    const currentDate = Date.now() / 1000;

    if (decoded.exp > currentDate) {
      setCurrentUser(decoded);
    } else {
      logoutUser();
      Store.dispatch({
        type: GLOBAL_ERROR,
        payload: new GlobalError(
          401,
          "Session has expired.",
          "Please login again."
        ),
      } as Action<GlobalError>);
    }
  }
};
