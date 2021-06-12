import { AxiosError } from "axios";
import { GlobalError } from "../../models/Error";
import { ACTIVATION_REQUIRED, GLOBAL_ERROR } from "../redux/actions/Types";
import { Store } from "../redux/Store";

export const throwError = (ex: AxiosError, params?: any) => {
  const code = ex?.response?.status;
  let payload;

  switch (code) {
    case 401:
      payload = new GlobalError(code, "Authorization Failed", ex.message);
      break;
    case 422:
      payload = new GlobalError(
        code,
        "Authorization Failed",
        ex.response?.data?.message
      );
      break;
    case 500:
      payload = new GlobalError(
        parseInt(ex.code || "500"),
        "Network request failed",
        "Unable to connect to server"
      );
    case 403:
      return Store.dispatch({
        type: ACTIVATION_REQUIRED,
        payload: {
          email: params.email,
        },
      });
    default:
      payload = new GlobalError(
        0,
        ex.name || "Unknown Error",
        ex?.message || "Unknown error has happened."
      );
      break;
  }

  Store.dispatch({
    type: GLOBAL_ERROR,
    payload,
  });
};
