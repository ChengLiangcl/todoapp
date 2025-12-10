import { createSlice } from '@reduxjs/toolkit';

import {
  completeTodo,
  fetchTodos,
  deleteTodos,
  addTodo,
  updateTodo,
} from './todoThunks';
import { saveState, getState } from '../../util/helper';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    todoWithDifferentStatusAndViews: getState(
      'todoWithDifferentStatusAndViews'
    ) || {
      all: {
        cardView: { page: 1, totalPages: 0, limit: 0, todos: [], total: 0 },
      },
    },
    deletedTodo: '',
    loading: false,
    error: null,
    todoView: getState('todoView') || 'cardView',
    currentStatus: getState('currentStatus') || 'all',
  },
  reducers: {
    deleteTodoItem: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    setCurrentStatus: (state, action) => {
      const tab = action.payload || 'All';
      state.currentStatus = tab;
    },
    setPaginationPage: (state, action) => {
      const { status, page } = action.payload;

      state.currentStatus = status;
      state.todoWithDifferentStatusAndViews = {
        ...state.todoWithDifferentStatusAndViews,
        [status]: {
          ...state.todoWithDifferentStatusAndViews[status],
          [state.todoView]: {
            ...state.todoWithDifferentStatusAndViews[status]?.[state.todoView],
            page,
          },
        },
      };
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
        const {
          page,
          limit,
          total,
          totalPages,
          status,
          data: todos,
        } = action.payload;

        state.todoWithDifferentStatusAndViews = {
          ...state.todoWithDifferentStatusAndViews,
          [status]: {
            ...state.todoWithDifferentStatusAndViews[status],
            [state.todoView]: {
              ...state.todoWithDifferentStatusAndViews[status]?.[
                state.todoView
              ],
              currentPage: page,
              limit,
              totalPages,
              todos,
              total,
            },
          },
        };
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
  setCurrentStatus,
} = todoSlice.actions;
export default todoSlice.reducer;
