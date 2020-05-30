import axios from "axios";
import Config from "react-native-config";

export const AxiosClient = axios.create({
  baseURL: Config.BACKEND_API,
  timeout: 5000,
});
