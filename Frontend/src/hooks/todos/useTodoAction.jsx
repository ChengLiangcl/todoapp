import { useDispatch, useSelector } from 'react-redux';
import { addTodo, setTodoView } from '../../store/todoSlice';
import { useState, useCallback } from 'react';
const useTodoAction = () => {
  const dispatch = useDispatch();
  const { todos, deletedTodo, paginationPage, todoView } = useSelector(
    (state) => state.todo
  );
  const [, setSelectedTodoId] = useState(null);
  const addTodoAction = useCallback(
    async (form) => {
      dispatch(addTodo(form));
    },
    [dispatch]
  );
  const handleDeleteClick = (id) => setSelectedTodoId(id);
  const handleUpdate = (id) => setSelectedTodoId(id);
  return {
    handleDeleteClick,
    handleUpdate,
    addTodoAction,
    todos,
    deletedTodo,
    paginationPage,
  };
};
export default useTodoAction;
