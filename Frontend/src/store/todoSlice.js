import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../util/http';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ page, limit, status }) => {
    const statusQuery = !status ? '' : `&status=${status}`;
    const data = await getRequest(
      `todos?page=${page}&limit=${limit}${statusQuery}`
    );
    return { todos: data?.data, totalPage: data?.totalPages, page, limit };
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

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const data = await putRequest(`todos/${todo.id}`, todo);
  const {
    _id,
    title,
    content,
    startDate,
    dueDate,
    isCompleted,
    deletedAt,
    files,
  } = data['todo'];
  return {
    _id,
    title,
    content,
    startDate,
    dueDate,
    isCompleted,
    deletedAt,
    files,
  };
});

export const completeTodo = createAsyncThunk(
  'todos/completeTodo',
  async (id) => {
    const data = await putRequest(`todos/complete/${id}`);
    return data;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    page: 1,
    totalPage: 0,
    limit: 0,
    deletedTodo: [],
    loading: false,
    error: null,
    paginationPage: {},
  },
  reducers: {
    deleteTodoItem: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    setPaginationPage: (state, action) => {
      const { status, page } = action.payload;
      state.paginationPage[status] = page;
      console.log(state.paginationPage);
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
        state.todos = action.payload.todos;
        state.totalPage = action.payload.totalPage;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
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
        state.deletedTodo = [action.payload.data.message];
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

export const { deleteTodoItem, setPaginationPage } = todoSlice.actions;
export default todoSlice.reducer;
