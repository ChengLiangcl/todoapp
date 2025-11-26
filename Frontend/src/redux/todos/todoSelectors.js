import { createSelector } from '@reduxjs/toolkit';

export const selectTodosState = (state) => state.todo;

export const selectAllTodos = createSelector(
  [selectTodosState],
  (todoState) => todoState.todos
);

export const selectTodosLoading = createSelector(
  [selectTodosState],
  (todoState) => todoState.loading
);

export const selectTodosError = createSelector(
  [selectTodosState],
  (todoState) => todoState.error
);

export const selectTodoView = createSelector(
  [selectTodosState],
  (todoState) => todoState.todoView
);

export const selectPaginationPage = createSelector(
  [selectTodosState],
  (todoState) => todoState.paginationPage
);
export const selectTotalPage = createSelector(
  [selectTodosState],
  (todoState) => todoState.totalPage
);

export const selectDeletedTodo = createSelector(
  [selectTodosState],
  (todoState) => todoState.deletedTodo
);
export const selectLimit = createSelector(
  [selectTodosState],
  (todoState) => todoState.limit
);

export const selectCurrentPage = createSelector(
  [selectTodosState],
  (todoState) => todoState.page
);

export const selectTotalRecords = createSelector(
  [selectTodosState],
  (todoState) => todoState.total
);
