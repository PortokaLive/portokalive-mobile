import { getVideoTokens } from "../redux/actions/ActionAuth";
import { MediaClient } from "../redux/AxiosClient";
import { throwError } from "./ErrorHelper";

export const httpGet = (url: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MediaClient.get(url);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      if (ex?.response?.status === 401) {
        await getVideoTokens();
        return httpGet(url);
      }
      throwError(ex);
    }
  });
};

export const httpPost = (url: string, params?: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MediaClient.post(url, params);
      if (!result) {
        reject();
      }
      resolve(result);
    } catch (ex) {
      if (ex?.response?.status === 401) {
        await getVideoTokens();
        return httpPost(url, params);
      }
      throwError(ex);
    }
  });
};
