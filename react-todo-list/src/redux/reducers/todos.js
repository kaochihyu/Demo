import { createSelector } from "reselect";
import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
  EDITING_TODO,
  CHANGE_TODO,
} from "../actionTypes";

let todoId = 0;

// state 的初始值
const initialState = {
  todos: [],
};

// 根據 dispatch 發送的 action 去決定要傳回甚麼 state
// state 的值跟 react 一樣 immutable
// reducer 是一個 pure function，接收 state、 action，負責回傳 state，不會去做其他事情
export default function todosReducer(state = initialState, action) {
  console.log("received action", action);
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state, // 要這樣寫才能保留原本的 state 然後添加新的東西
        todos: [
          ...state.todos,
          {
            id: todoId++,
            name: action.payload.name,
            completed: false,
            editing: false,
          },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };
    }
    case COMPLETE_ALL: {
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: true,
        }
        )),
      };
    }
    case CLEAR_COMPLETED: {
      // 這樣寫會造成 clear 後，被移除的會被遞補，然後 checkbox 就變成打勾的了，但 log 出來 complete: false，checkbox 好像沒有被連到
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.completed !== true),
      };
    }
    case EDITING_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return {
            ...todo,
            editing: !todo.editing,
          };
        }),
      };
    }
    case CHANGE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return {
            ...todo,
            name: action.payload.value,
            editing: false,
          };
        }),
      };
    }
    default: {
      return state;
    }
  }
}

const todoSelector = (state) => state.todos;
export const todoWithMilk = createSelector([todoSelector], (todos) => {
  return todos.filter((todo) => todo.name.toLowerCase().includes("milk"));
});
