import { AxiosError } from "axios";
import { GlobalError } from "../../models/Error";
import { GLOBAL_ERROR } from "../redux/actions/Types";
import { Store } from "../redux/Store";

export const throwNetworkError = (ex: AxiosError) => {
  const code = ex?.response?.status;
  let payload;

  switch (code) {
    case 401:
      payload = new GlobalError(code, "Authorization Failed", ex.message);
      break;
    case 500:
      payload = new GlobalError(
        parseInt(ex.code || "500"),
        "Network request failed",
        "Unable to connect to server"
      );
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
