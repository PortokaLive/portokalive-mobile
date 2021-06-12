import axios from "axios";
import Config from "./Config";
import { getItem } from "../helpers/AsyncStorageHelper";

export const getToken = (key: string) =>
  new Promise<string>((resolve, reject) => {
    getItem(key)
      .then((token) => {
        if (!token) {
          resolve("");
        } else {
          resolve(token);
        }
      })
      .catch(() => {
        console.log("Auth token is empty.");
        resolve("");
      });
  });

export const BackendClient = axios.create({
  baseURL:
    Config["BACKEND_API_" + Config.ENVIRONMENT] || Config.BACKEND_API_DEV,
  timeout: 5000,
});

BackendClient.interceptors.request.use(async function (config) {
  const token = await getToken("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const MediaClient = axios.create({
  baseURL: Config["LIVE_API"],
  timeout: 5000,
});

MediaClient.interceptors.request.use(async function (config) {
  const token = await getToken("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const MediaSandboxClient = axios.create({
  baseURL: Config["LIVE_SANDBOX_API"],
  timeout: 5000,
});
