import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../util/http';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const data = await getRequest('todos');
  return data; // expect array of todos
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const data = await postRequest('todos', todo);
  return data;
});

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId) => {
    const data = await deleteRequest(`todos/${todoId}`);
    return todoId;
  }
);

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const data = await putRequest(`todos/${todo.id}`, todo);
  return data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    // example of a sync reducer
    resetTodos: (state) => {
      state.todos = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTodos lifecycle
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // addTodo lifecycle
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // updateTodo lifecycle
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === updated.id);
        if (index !== -1) {
          state.todos[index] = updated;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // deleteTodo lifecycle
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetTodos } = todoSlice.actions;
export default todoSlice.reducer;
