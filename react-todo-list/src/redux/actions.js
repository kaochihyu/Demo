import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
  CHANGE_STATUS,
  EDITING_TODO,
  CHANGE_TODO,
} from "./actionTypes";

// action creator，不用每次都打很多字
export function addTodo(name) {
  return {
    type: ADD_TODO,
    payload: {
      name,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

export function completeAll() {
  return {
    type: COMPLETE_ALL,
  };
}

export function clearCompleted() {
  return {
    type: CLEAR_COMPLETED,
  };
}

export function changeStatus(filterValue) {
  return {
    type: CHANGE_STATUS,
    payload: {
      filterValue,
    },
  };
}

export function editingTodo(id) {
  return {
    type: EDITING_TODO,
    payload: {
      id,
    },
  };
}

export function changeTodo(id, value) {
  return {
    type: CHANGE_TODO,
    payload: {
      id,
      value,
    },
  };
}
