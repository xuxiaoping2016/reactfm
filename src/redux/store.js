import { createStore, applyMiddleware } from "./redux";
import thunkMiddleware from "./redux-thunk";
import logs from "./log";
import combineReducers from "./reducers.js";

// if (module.hot) {
//   module.hot.accept("./reducers", () => {
//     const nextCombineReducers = require("./reducers").default;
//     store.replaceReducer(nextCombineReducers);
//   });
// }

let store = createStore(combineReducers, applyMiddleware(thunkMiddleware,logs));

export default store;
