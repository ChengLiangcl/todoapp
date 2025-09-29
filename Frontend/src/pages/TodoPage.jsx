import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CustomizedPagination from '../components/Pagination/CustomizedPagination';
import TodoList from '../components/Todo/TodoList';
import TodoModal from '../components/Todo/TodoModal';
import TodoFilter from '../components/Todo/TodoFilter';
import Loader from '../components/Loader/Loader';
import ModalButton from '../components/ModalButton/ModalButton';
import { fetchTodos, addTodo } from '../store/todoSlice';
import Banner from '../components/Alert/Banner';
import TodoNotifier from '../components/SnackBar/SnackBar';
import { useModal } from '../context/ModalContext';
import Tabs from '@components/Tab/Tabs';
import { Margin } from '@mui/icons-material';

const TodoPage = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, totalPage, deletedTodo } = useSelector(
    (state) => state.todo
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSelectedTodoId] = useState(null);
  const { modal } = useModal();

  const [tab, setTab] = useState('All');
  useEffect(() => {
    dispatch(fetchTodos({ page: currentPage, limit: 9 }));
  }, [dispatch, currentPage]);

  const handleDeleteClick = (id) => setSelectedTodoId(id);
  const handleUpdate = (id) => setSelectedTodoId(id);

  const addTodoAction = useCallback(
    async (form) => {
      await dispatch(addTodo(form));
    },
    [dispatch]
  );

  const filteredTodos = React.useMemo(() => {
    switch (tab) {
      case 'All':
        return todos;
      case 'Ongoing':
        return todos.filter(
          (todo) => !todo.isCompleted && new Date(todo.dueDate) > new Date()
        );
      case 'Completed':
        return todos.filter((todo) => todo.isCompleted);
      case 'Overdue':
        return todos.filter(
          (todo) => !todo.isCompleted && new Date(todo.dueDate) <= new Date()
        );
      default:
        return todos;
    }
  }, [todos, tab]);

  useEffect(() => {
    console.log('loadTodos', todos); // loadTodos()
  }, [todos]);

  const renderEmptyContent = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 5,
      }}
    >
      <AssignmentTurnedInIcon
        sx={{ fontSize: 50, color: 'primary.main', mb: 2 }}
      />
      <Typography variant="body1">
        No todos found. Click <strong>"Add Todo Item"</strong> to create your
        first one.
      </Typography>
    </Box>
  );

  if (loading) return <Loader>Please wait...</Loader>;

  return (
    <>
      <TodoFilter />
      {error && (
        <Banner
          sx={{ marginTop: '20px' }}
          severity="error"
          visible
          message={error}
        />
      )}

      {deletedTodo.map((item, index) => (
        <TodoNotifier key={index} sx={{ marginTop: '20px' }} message={item} />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <ModalButton
          buttonText="Add Todo Item"
          isDialogRequired={true}
          dialogConfig={{
            title: 'Are you sure you want to exit to create a todo?',
            dialogContentText:
              'Click confirm to exit, if you click no changes will be saved.',
          }}
          btnDivStyle={{ mr: 2, mb: 2 }}
        />
      </Box>
      <Tabs
        TabItems={['All', 'Ongoing', 'Overdue', 'Completed']}
        tab={tab}
        setTab={setTab}
      />

      {modal?.isOpen && (
        <TodoModal title="Add Todo Item" action={addTodoAction} />
      )}

      {filteredTodos.length === 0 ? (
        renderEmptyContent()
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pb: 5,
            }}
          >
            <TodoList
              todos={filteredTodos}
              onDelete={handleDeleteClick}
              onUpdate={handleUpdate}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CustomizedPagination
              count={totalPage}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default TodoPage;
