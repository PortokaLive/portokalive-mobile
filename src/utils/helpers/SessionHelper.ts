import { getItem } from "./AsyncStorageHelper";
import jwtDecode from "jwt-decode";
import { setCurrentUser, logoutUser } from "../redux/actions/ActionAuth";

export const checkPreviousSession = async () => {
  const token = await getItem("token");
  if (token) {
    const decoded = jwtDecode<any>(token);
    setCurrentUser(decoded);
    const currentDate = Date.now() / 1000;

    if (decoded.exp > currentDate) {
      setCurrentUser(decoded);
    }
  }
};
