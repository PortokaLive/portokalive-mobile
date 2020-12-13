import { BackendClient } from "../redux/AxiosClient";
import { Store } from "../redux/Store";
import { GLOBAL_ERROR } from "../redux/actions/Types";
import { GlobalError } from "../../models/Error";
import { throwNetworkError } from "./ErrorHelper";

export const httpGet = (url: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await BackendClient.get(url);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      throwNetworkError(ex);
    }
  });
};

export const httpPost = (url: string, params: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await BackendClient.post(url, params);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      throwNetworkError(ex);
    }
  });
};
