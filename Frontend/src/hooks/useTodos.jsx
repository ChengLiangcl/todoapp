import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, setPaginationPage } from '../store/todoSlice';
import { useState, useEffect, useCallback } from 'react';
const useTodos = (tabName) => {
  const dispatch = useDispatch();

  const { todos, loading, error, totalPage, deletedTodo, paginationPage } =
    useSelector((state) => state.todo);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSelectedTodoId] = useState(null);
  const [tab, setTab] = useState(tabName);

  useEffect(() => {
    const status = tab === 'All' ? {} : { status: tab };
    dispatch(
      fetchTodos({
        page: paginationPage[tab] || 1,
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
  };
};
export default useTodos;
