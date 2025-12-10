import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../../util/http';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ page, limit, status }) => {
    const statusQuery = !status ? '' : `&status=${status}`;
    const data = await getRequest(
      `todos?page=${page}&limit=${limit}${statusQuery}`
    );

    return { ...data, status };
    // return { todos: data?.data, totalPage: data?.totalPages, page, limit };
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
