import { createSelector } from 'reselect';

// 避免每個地方都寫成這樣會太長
export const selectTodos = (store) => store.todos.todos;
export const selectFilters = (store) => store.filters;

const selectNumOfDoneTodos = createSelector(
  selectTodos,
  (todos) => todos.filter(todo => todo.completed).length
);

const selectNumOfAllTodos = createSelector(
  selectTodos,
  (todos) => todos.length
);

export const rateOfDone = createSelector(
  selectNumOfDoneTodos,
  selectNumOfAllTodos,
  (done, all) => Math.floor((Number(done) / Number(all)) * 100)
);

export const selectCompleteTodos = createSelector(
	selectTodos, (todos) =>
  todos.filter(todo => todo.completed)
);

export const selectActiveTodos = createSelector(
	selectTodos, (todos) =>
  todos.filter(todo => !todo.completed)
);
