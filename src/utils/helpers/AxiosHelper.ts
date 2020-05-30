import { AxiosClient } from "../redux/AxiosClient";
import { Store } from "../redux/Store";
import { GLOBAL_ERROR } from "../redux/actions/Types";
import { GlobalError } from "../../models/Error";

export const httpGet = (url: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await AxiosClient.get(url);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      if (ex.message === "Network Error") {
        throwNetworkError();
        reject();
      } else {
        reject(ex);
      }
    }
  });
};

export const httpPost = (url: string, params: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await AxiosClient.post(url, params);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      if (ex.message === "Network Error") {
        throwNetworkError();
        reject();
      } else {
        reject(ex);
      }
    }
  });
};

const throwNetworkError = () => {
  Store.dispatch({
    type: GLOBAL_ERROR,
    payload: new GlobalError(
      500,
      "Network request failed",
      "Unable to connect to server"
    ),
  });
};
