import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import stretches from "./stretches";
import stretch from "./stretch";
import routines from "./routines";
import routine from "./routine";
import camera from "./camera";

const reducer = combineReducers({
  stretches,
  stretch,
  routines,
  routine,
  camera,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
