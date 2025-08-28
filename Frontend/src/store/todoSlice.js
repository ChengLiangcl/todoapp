import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../util/http';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ page, limit }) => {
    const data = await getRequest(`todos?page=${page}&limit=${limit}`);
    return { todo: data?.data, totalPage: data?.totalPages, page, limit };
  }
);

export const fetchCurrentTodo = createAsyncThunk(
  'todos/fetchCurrentTodo',
  async (id) => {
    const data = await getRequest(`todos/${id}`);
    return data;
  }
);

export const deleteTodos = createAsyncThunk('todos/deleteTodos', async (id) => {
  const data = await deleteRequest(`todos/${id}`);
  return { data, id };
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const data = await postRequest('todos', todo);
  const { _id, title, content, startDate, dueDate, isCompleted, deletedAt } =
    data['todo'];
  return { _id, title, content, startDate, dueDate, isCompleted, deletedAt };
});
//
export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const data = await putRequest(`todos/${todo.id}`, todo);
  return data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    totalPage: 0,
    limit: 0,
    loading: false,
    error: null,
  },
  reducers: {
    deleteTodoItem: (state, action) => {
      const id = action.payload;
      if (id) {
        state.todos = state.todos.filter((todo) => todo._id !== id);
      }
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
        state.todos = action.payload.todo;
        state.totalPage = action.payload.totalPage;
        state.limit = action.payload.limit;
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
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === updated.id);
        if (index !== -1) state.todos[index] = updated;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTodos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.todos = state.todos.filter((todo) => todo._id !== id);
        state.loading = false;
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { confirmDelete, deleteTodoItem } = todoSlice.actions;
export default todoSlice.reducer;
