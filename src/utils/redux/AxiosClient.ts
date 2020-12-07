import axios from "axios";
import Config from "react-native-config";
import { getItem } from "../helpers/AsyncStorageHelper";

export const setAuthToken = () => {
  getItem("token")
    .then((token) => {
      axios.defaults.headers.common["Authorization"] = token;
    })
    .catch(() => {
      console.log("Auth token is empty.");
    });
};

setAuthToken();

export const AxiosClient = axios.create({
  baseURL:
    Config["BACKEND_API_" + Config.ENVIRONMENT] || Config.BACKEND_API_DEV,
  timeout: 5000,
});
