import React from 'react';
import Button from '../Button/Button';
import ModalButton from '../ModalButton/ModalButton';
import TodoModal from '../Todo/TodoModal';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/ModalContext';
import { Alert } from '@mui/material';
import AlertDialog from '../Dialog/Dialog';
import { useCallback } from 'react';
const TodoCardViewButtonGroup = ({ onDelete, onComplete, id }) => {
  const { todos } = useSelector((state) => state.todo);
  const { isDialogOpen, openDialog, dialogContent } = useModal();
  // Load todo data for update modal
  const loadTodoInfo = useCallback(() => {
    const currentTodo = todos.find((todo) => todo._id === id);

    if (!currentTodo) return {};
    const { title, content, startDate, dueDate } = currentTodo;

    return { title, content, startDate, dueDate };
  }, [todos, id]);

  const hoverEffect = {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 8px rgba(0,0,0,0.3)',
    },
  };

  return (
    <>
      <Button
        btnName="Delete"
        onClick={() =>
          openDialog(
            <AlertDialog
              title={'Are you sure you want to delete this item?'}
              dialogContentText={
                'Choose Yes to delete this item, or No to cancel the action.'
              }
            />
          )
        }
        sx={{
          ...hoverEffect,
          backgroundColor: '#d32f2f',
          color: '#fff',
          '&:hover': {
            ...hoverEffect['&:hover'],
            backgroundColor: '#b71c1c',
            color: '#fff',
          },
        }}
      />
      <Button
        btnName="Complete"
        onClick={() => onComplete(id)}
        sx={{
          ...hoverEffect,
          backgroundColor: '#e0f2f1',
          color: '#2e7d32',
          '&:hover': {
            ...hoverEffect['&:hover'],
            backgroundColor: '#b2dfdb',
            color: '#2e7d32',
          },
        }}
      />
      <ModalButton
        id={id}
        buttonText="Update"
        buttonStyle={{
          ...hoverEffect,
          backgroundColor: '#bbdefb',
          color: '#1976d2',
          '&:hover': {
            ...hoverEffect['&:hover'],
            backgroundColor: '#90caf9',
            color: '#1976d2',
          },
        }}
      >
        <TodoModal
          title="Update Todo Item"
          dialogConfig={{
            title: 'Are you sure you want to exit update creation?',
            content: 'Click Yes to create a record, No to exit the modal',
          }}
          loadTodoInfo={loadTodoInfo}
        />
      </ModalButton>
    </>
  );
};

export default TodoCardViewButtonGroup;
