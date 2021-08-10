// redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import user from "./modules/user";
import room from "./modules/room";
import image from "./modules/image";
import document from "./modules/document";
import date from "./modules/date";
import calendar from "./modules/calendar";
import board from "./modules/board";
import todos from "./modules/todos";
import member from "./modules/member";

// middlewares
import thunk from "redux-thunk";

// redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  member,
  todos,
  board,
  user,
  room,
  image,
  document,
  date,
  calendar,
  router: connectRouter(history),
});

const env = process.env.NODE_ENV;
const middlewares = [thunk.withExtraArgument({ history })];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const enhancer =
  env === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);
export default store;
