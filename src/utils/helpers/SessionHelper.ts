import { getItem } from "./AsyncStorageHelpers";


export const checkPreviousSession = () => {
  if (getItem("token")) {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode<any>(token);
    setCurrentUser(decoded);
    const currenDate = Date.now() / 1000;

    if (decoded.exp < currenDate) {
      logoutUser();
      window.location.href = "/";
    }
  }
}