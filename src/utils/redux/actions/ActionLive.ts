import { Action } from "redux";
import { httpGet } from "../../helpers/ApiVideoHelper";
import { Store } from "../Store";
import { LIVE_LISTS } from "./Types";

export const getLiveLists = async () => {
  try {
    const list = await httpGet("/live-streams?currentPage=1&pageSize=25");
    Store.dispatch({
      type: LIVE_LISTS,
      payload: list,
    } as Action<any>);
  } catch (ex) {
    throw ex;
  }
};
