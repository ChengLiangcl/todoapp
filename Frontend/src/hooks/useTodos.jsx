import { useDispatch, useSelector } from 'react-redux';
// import {
// fetchTodos,
// addTodo,
//   setPaginationPage,
//   setTodoView,
// } from '../store/todoSlice';

import { fetchTodos, addTodo } from '../redux/todos/todoThunks';

import { setPaginationPage, setTodoView } from '../redux/todos/todoSlice';
import { useState, useEffect, useCallback } from 'react';
import TodoCardViewButtonGroup from '../components/CardView/TodoCardViewButtonGroup';
import Tag from '@components/Tag/Tag';
const useTodos = (tabName) => {
  const dispatch = useDispatch();

  const {
    todos,
    loading,
    error,
    totalPage,
    deletedTodo,
    paginationPage,
    page,
  } = useSelector((state) => state.todo);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSelectedTodoId] = useState(null);
  const [tab, setTab] = useState(tabName);

  useEffect(() => {
    const status = tab === 'All' ? {} : { status: tab };
    dispatch(
      fetchTodos({
        page: page || 1,
        limit: 9,
        ...status,
      })
    );
  }, [dispatch, currentPage, tab, paginationPage]);

  const addTodoAction = useCallback(
    async (form) => {
      dispatch(addTodo(form));
    },
    [dispatch]
  );
  const handleDeleteClick = (id) => setSelectedTodoId(id);
  const handleUpdate = (id) => setSelectedTodoId(id);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(setPaginationPage({ status: tab, page }));
  };

  const handleViewChange = (type) => dispatch(setTodoView(type));

  const setTag = (todo) => {
    const dueDate = new Date(todo.dueDate);
    const currentDate = new Date();
    if (todo.isCompleted) return ['Completed', 'success'];
    if (!todo.isCompleted && dueDate >= currentDate)
      return ['Ongoing', 'primary'];
    if (!todo.isCompleted && dueDate < currentDate)
      return ['Overdue', 'warning'];
    return ['Uncategorized', 'warning'];
  };

  const useTodoTableViewData = todos?.map((todo) => {
    const [tagName, color] = setTag(todo);
    const status = <Tag tagName={tagName} color={color} />;

    return {
      id: todo._id,
      coverphoto: 'None',
      title: todo.title,
      status,
      startDate: new Date(todo.createdAt).toLocaleTimeString(),
      dueDate: new Date(todo.dueDate).toLocaleTimeString(),
      action: (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TodoCardViewButtonGroup tagName={tab} id={todo._id} />
        </div>
      ),
    };
  });
  return {
    handleDeleteClick,
    handleUpdate,
    addTodoAction,
    todos,
    loading,
    error,
    totalPage,
    deletedTodo,
    paginationPage,
    currentPage,
    setCurrentPage,
    handlePageChange,
    tab,
    setTab,
    handleViewChange,
    useTodoTableViewData,
  };
};
export default useTodos;
