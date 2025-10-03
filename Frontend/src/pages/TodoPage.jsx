import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CustomizedPagination from '../components/Pagination/CustomizedPagination';
import TodoList from '../components/Todo/TodoList';
import TodoModal from '../components/Todo/TodoModal';
import TodoFilter from '../components/Todo/TodoFilter';
import Loader from '../components/Loader/Loader';
import ModalButton from '../components/ModalButton/ModalButton';
import Banner from '../components/Alert/Banner';
import TodoNotifier from '../components/SnackBar/SnackBar';
import { useModal } from '../context/ModalContext';
import Tabs from '@components/Tab/Tabs';
import useTodos from '@hooks/useTodos';

const TodoPage = () => {
  const { todos, loading, error, totalPage, deletedTodo, paginationPage } =
    useSelector((state) => state.todo);
  // const [, setSelectedTodoId] = useState(null);
  const { modal } = useModal();
  const {
    handleDeleteClick,
    handleUpdate,
    addTodoAction,
    handlePageChange,
    setTab,
    tab,
  } = useTodos('All');

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
              currentPage={paginationPage[tab] || 1}
              onPageChange={(page) => handlePageChange(page)}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default TodoPage;
