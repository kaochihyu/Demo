import { CHANGE_STATUS } from "../actionTypes";

// state 的初始值
const initialState = {
  status: "all",
};

// 根據 dispatch 發送的 action 去決定要傳回甚麼 state
// state 的值跟 react 一樣 immutable
// reducer 是一個 pure function，接收 state、 action，負責回傳 state，不會去做其他事情
export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATUS: {
      return {
        ...state, // 要這樣寫才能保留原本的 state 然後添加新的東西
        status: action.payload.filterValue,
      };
    }
    default: {
      return state;
    }
  }
}
