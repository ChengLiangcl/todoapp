import React, { useCallback } from 'react';
import { useModal } from '../../context/ModalContext';
import { deleteTodos, completeTodo, updateTodo } from '../../store/todoSlice';
import { useDispatch } from 'react-redux';
import Button from '@components/Button/Button';
import ModalButton from '@components/ModalButton/ModalButton';
import TodoModal from '@components/Todo/TodoModal';
const TodoCardViewButtonGroup = ({ onComplete, id }) => {
  const { modal, openDialog, setDialog } = useModal();
  const dispatch = useDispatch();

  const updarteTodoAction = useCallback(
    async (form) => {
      await dispatch(updateTodo({ ...form, id }));
    },
    [dispatch, id]
  );

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
        id={id}
        onClick={() =>
          openDialog(
            () => dispatch(deleteTodos(id)),
            setDialog((prev) => ({
              ...prev,
              isOpen: true,
              title: 'Are you sure you want to delete this todo item?',
              dialogContentText: 'Click confirm to delete and no to cancel',
            }))
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
        onClick={() =>
          openDialog(
            () => dispatch(completeTodo(id)),
            setDialog((prev) => ({
              ...prev,
              isOpen: true,
              title:
                'Are you sure you want to mark this todo item as complete?',
              dialogContentText: 'Click confirm to complete and no to cancel',
            }))
          )
        }
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
        isDialogRequired={true}
        dialogConfig={{
          title: 'Are you sure you want to cancel update this todo item?',
          dialogContentText: 'Click confirm to update and no to cancel',
        }}
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
      />

      {modal.isOpen && modal.modalId === id && (
        <TodoModal
          action={updarteTodoAction}
          id={id}
          title="Update Todo Item"
          dialogConfig={{
            title: 'Are you sure you want to exit update creation?',
            content: 'Click Yes to create a record, No to exit the modal',
          }}
        />
      )}
    </>
  );
};

export default TodoCardViewButtonGroup;
