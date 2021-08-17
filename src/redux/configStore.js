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
import member from "./modules/member";
import dashBoard from "./modules/dashBoard";
import chat from "./modules/chat";

// middlewares
import thunk from "redux-thunk";

// redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
export const history = createBrowserHistory();

const appReducer = combineReducers({
  dashBoard,
  member,
  todos,
  board,
  user,
  room,
  image,
  document,
  date,
  calendar,
  chat,
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
