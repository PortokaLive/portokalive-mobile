import { createStore, applyMiddleware, compose } from "redux";
import { rootReducers } from "./reducers";
import thunk from "redux-thunk";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";

type RootState = ReturnType<typeof rootReducers>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initialState = {};

export const Store = createStore(
  rootReducers,
  initialState,
  compose(applyMiddleware(...[thunk]))
);
