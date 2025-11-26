import { createSlice } from '@reduxjs/toolkit';

import {
  completeTodo,
  fetchTodos,
  deleteTodos,
  addTodo,
  updateTodo,
} from './todoThunks';
import { saveState, getState } from '../../util/helper';

const cardViewInitialState = {};
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    page: getState('page') || {},
    totalPage: getState('totalPage') || 0,
    limit: getState('limit') || 0,
    deletedTodo: '',
    loading: false,
    error: null,
    paginationPage: {},
    todoView: getState('todoView') || 'cardView',
    total: getState('total') || 0,
  },
  reducers: {
    deleteTodoItem: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    setPaginationPage: (state, action) => {
      const { status, page } = action.payload;
      state.paginationPage[status] = page;
    },
    clearDeletedTodo: (state) => {
      state.deletedTodo = '';
    },
    setTodoView: (state, action) => {
      state.todoView =
        action.payload === 'tableView' ? 'cardView' : 'tableView';
      saveState('todoView', state.todoView);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        const { data, totalPages, page, limit, total } = action.payload;
        state.todos = data;
        state.totalPage = totalPages;
        state.limit = limit;
        state.total = total;
        state.page = page;

        saveState('page', state.page);
        saveState('total', state.total);
        saveState('totalPage', state.totalPage);
        saveState('limit', state.limit);
        saveState('todos', state.todos);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        if (state.todos.length < state.limit) state.todos.push(action.payload);
        else state.page += 1;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo._id === updatedTodo._id
        );
        state.todos[index] = updatedTodo;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.todos = state.todos.filter((todo) => todo._id !== id);
        state.loading = false;
        state.deletedTodo = action.payload.data.message;
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(completeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  deleteTodoItem,
  setPaginationPage,
  clearDeletedTodo,
  setTodoView,
} = todoSlice.actions;
export default todoSlice.reducer;
