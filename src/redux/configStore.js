// redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./modules/user";
import room from "./modules/room";
import image from "./modules/image";
import document from "./modules/document";
import calendar from "./modules/calendar";

// middlewares
import thunk from "redux-thunk";

// redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user,
  room,
  image,
  document,
  calendar,
  router: connectRouter(history),
});

const env = process.env.NODE_ENV;
const middlewares = [thunk.withExtraArgument({ history })];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
