import React, { useEffect, useState } from 'react';
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
import useForm from '../hooks/useForms';

const TodoPage = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, totalPage, deletedTodo } = useSelector(
    (state) => state.todo
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos({ page: currentPage, limit: 9 }));
  }, [dispatch, currentPage]);

  const handleDeleteClick = (id) => {
    setSelectedTodoId(id);
  };

  const handleUpdate = (id) => {
    setSelectedTodoId(id);
  };

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

      {deletedTodo.map((item, index) => {
        return (
          <Banner
            key={index}
            sx={{ marginTop: '20px' }}
            severity="success"
            visible
            message={item}
          />
        );
      })}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <ModalButton
          buttonText="Add Todo Item"
          isDialogRequired={true}
          dialogConfig={{
            title: 'Are you sure you want to exit to create a todo?',
            dialogContentText:
              'Click confirm to exit, if you click no changes will be saved.',
          }}
        >
          <TodoModal title="Add Todo Item" />
        </ModalButton>
      </Box>

      {todos.length === 0 ? (
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
              todos={todos}
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
