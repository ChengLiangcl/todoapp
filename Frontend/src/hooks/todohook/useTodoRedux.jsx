import { useDispatch, useSelector } from 'react-redux';

import { fetchTodos, addTodo } from '../../redux/todos/todoThunks';

import {
  setPaginationPage,
  setTodoView,
  setCurrentStatus,
} from '../../redux/todos/todoSlice';
import { useEffect, useState } from 'react';

const useTodoRedux = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('all');

  const {
    todoWithDifferentStatusAndViews,
    loading,
    error,
    deletedTodo,
    todoView,
    currentStatus,
  } = useSelector((state) => state.todo);

  useEffect(() => {
    const status = currentStatus;

    dispatch(
      fetchTodos({
        page: todoWithDifferentStatusAndViews[status]?.[todoView]?.page || 1,
        limit: 9,
        status: status,
      })
    );
  }, [dispatch, currentStatus, todoView, tab]);

  const todoData = todoWithDifferentStatusAndViews[currentStatus]?.[
    todoView
  ] || {
    todos: [],
    totalPages: 0,
    page: 1,
    limit: 9,
    total: 0,
  };

  const { todos, totalPages, page, limit, total } = todoData;
  const addTodoAction = async (form) => {
    dispatch(addTodo(form));
  };

  const setTabStatus = (status) => {
    setTab(status);
    dispatch(setCurrentStatus(status));
  };

  const handlePageChange = (page) => {
    const tab = currentStatus;
    dispatch(setPaginationPage({ status: tab, page }));

    dispatch(
      fetchTodos({
        page,
        limit: 9,
        status: tab,
      })
    );
  };

  const handleViewChange = (type) => dispatch(setTodoView(type));
  return {
    todoWithDifferentStatusAndViews,
    loading,
    error,
    deletedTodo,
    todoView,
    currentStatus,
    addTodoAction,
    handlePageChange,
    handleViewChange,
    todos,
    totalPages,
    page,
    limit,
    total,
    setTabStatus,
  };
};

export default useTodoRedux;
