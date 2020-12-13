import { MediaClient } from "../redux/AxiosClient";
import { throwNetworkError } from "./ErrorHelper";

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
    }
  });
};
