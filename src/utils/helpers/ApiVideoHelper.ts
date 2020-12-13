import { AxiosError } from "axios";
import { GlobalError } from "../../models/Error";
import { GLOBAL_ERROR } from "../redux/actions/Types";
import { MediaClient } from "../redux/AxiosClient";
import { Store } from "../redux/Store";

export const httpGet = (url: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MediaClient.get(url);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      throwNetworkError(ex);
      reject(ex);
    }
  });
};

export const httpPost = (url: string, params: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MediaClient.post(url, params);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      throwNetworkError(ex);
      reject(ex);
    }
  });
};

export const throwNetworkError = (ex: AxiosError) => {
  const code = parseInt(ex.code || "500");
  let payload;

  switch (code) {
    case 401:
      payload = new GlobalError(code, "Authorization Failed", ex.message);
    default:
      payload = new GlobalError(
        parseInt(ex.code || "500"),
        "Network request failed",
        "Unable to connect to server"
      );
  }

  Store.dispatch({
    type: GLOBAL_ERROR,
    payload,
  });
};
