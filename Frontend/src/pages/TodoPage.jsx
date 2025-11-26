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
import Button from '../components/Button/Button';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import PaginationTable from '@components/Table/PaginationTable';
import { todoTableColumnsConfig } from '@components/Table/TodoTable/TodoTableConfig';
import { useEffect } from 'react';
import {
  selectTotalPage,
  selectTodoView,
  selectTodosLoading,
  selectTodosError,
  selectPaginationPage,
  selectDeletedTodo,
  selectAllTodos,
  selectCurrentPage,
  selectTotalRecords,
} from '../redux/todos/todoSelectors';
import { fetchTodos } from '../redux/todos/todoThunks';
import { useDispatch } from 'react-redux';
const TodoPage = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPage);
  const loading = useSelector(selectTodosLoading);
  const error = useSelector(selectTodosError);
  const paginationPage = useSelector(selectPaginationPage);
  const todoView = useSelector(selectTodoView);
  const deletedTodo = useSelector(selectDeletedTodo);
  const todos = useSelector(selectAllTodos);
  const page = useSelector(selectCurrentPage);
  const totalRecords = useSelector(selectTotalRecords);

  // const [, setSelectedTodoId] = useState(null);
  const { modal } = useModal();
  const {
    handleDeleteClick,
    handleViewChange,
    handleUpdate,
    addTodoAction,
    handlePageChange,
    setTab,
    useTodoTableViewData,
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

      {deletedTodo && (
        <TodoNotifier sx={{ marginTop: '20px' }} message={deletedTodo} />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
        <Button
          onClick={() => handleViewChange(todoView)}
          btnName={
            todoView === 'cardView'
              ? 'Switch to table view'
              : 'Switch to card list view'
          }
          startIcon={<RotateLeftOutlinedIcon />}
        >
          Clear All
        </Button>
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

      {todoView === 'cardView' &&
        (todos?.length === 0 ? (
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
                count={totalPages}
                currentPage={paginationPage[tab] || 1}
                onPageChange={(page) => handlePageChange(page)}
              />
            </Box>
          </>
        ))}

      {todoView === 'tableView' && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <Box sx={{ width: '70%' }}>
            <PaginationTable
              columns={todoTableColumnsConfig}
              rows={useTodoTableViewData}
              page={page}
              totalCount={totalRecords}
              fetchingFn={(tablePage, tableLimit) => {
                dispatch(fetchTodos({ page: tablePage, limit: tableLimit }));
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default TodoPage;
