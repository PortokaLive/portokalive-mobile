import { Action } from "redux";
import { httpGet, httpPost } from "../../helpers/ApiVideoHelper";
import { Store } from "../Store";
import { LIVE_LISTS, LIVE_LISTS_INCREMENT, SET_CURRENT_LIVE } from "./Types";

export const getLiveLists = async (page: number, refresh?: boolean) => {
  try {
    const result = await httpGet(
      `/live-streams?currentPage=${page}&pageSize=5`
    );

    if (result?.data) {
      if (!refresh) {
        Store.dispatch({
          type: LIVE_LISTS,
          payload: result?.data?.data,
        } as Action<any>);
      } else {
        Store.dispatch({
          type: LIVE_LISTS,
          payload: result?.data?.data,
        } as Action<any>);
      }
    }
  } catch (ex) {
    console.error(ex);
  }
};

export const createLiveStream = async (name: string) => {
  try {
    const result = await httpPost("/live-streams", { name, record: false });

    if (result?.data) {
      Store.dispatch({
        type: SET_CURRENT_LIVE,
        payload: result?.data,
      } as Action<any>);
    }
  } catch (ex) {
    console.error(ex);
  }
};
