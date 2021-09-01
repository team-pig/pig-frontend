// redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createAction } from "redux-actions";

import user from "./modules/user";
import room from "./modules/room";
import image from "./modules/image";
import document from "./modules/document";
import date from "./modules/date";
import calendar from "./modules/calendar";
import board from "./modules/board";
import todos from "./modules/todos";
import alert from "./modules/alert";
import confirm from "./modules/confirm";
import chat from "./modules/chat";
import resize from "./modules/resize";
import members from "./modules/members";
import error from "./modules/error";

// middlewares
import thunk from "redux-thunk";

// redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
export const history = createBrowserHistory();

const appReducer = combineReducers({
  error,
  alert,
  todos,
  board,
  user,
  room,
  image,
  document,
  date,
  calendar,
  chat,
  resize,
  members,
  confirm,
  router: connectRouter(history),
});

const RESET_REDUCER = "root/RESET_REDUCER";

export const resetReducer = createAction(RESET_REDUCER);

const rootReducer = (state, action) => {
  if (action.type === "root/RESET_REDUCER") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const env = process.env.NODE_ENV;
const middlewares = [thunk.withExtraArgument({ history })];

const enhancer =
  env === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);
export default store;
