import { BackendClient } from "../redux/AxiosClient";
import { throwError } from "./ErrorHelper";

export const httpGet = (url: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await BackendClient.get(url);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      throwError(ex);
    }
  });
};

export const httpPost = (url: string, params?: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await BackendClient.post(url, params);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      throwError(ex, params);
    }
  });
};
