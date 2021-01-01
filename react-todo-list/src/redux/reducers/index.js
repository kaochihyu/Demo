import { combineReducers } from "redux";
import todos from "./todos";
import filters from "./filters";

export default combineReducers({
  todos: todos,
  filters: filters,
});

// store 存的格式
// {
//  todos: {
//    todos: []
//  },
//  filters: {
//
//  }
// }
