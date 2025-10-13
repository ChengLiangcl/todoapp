import React, { useCallback } from 'react';
import { useModal } from '../../context/ModalContext';
import { deleteTodos, completeTodo, updateTodo } from '../../store/todoSlice';
import { useDispatch } from 'react-redux';
import Button from '@components/Button/Button';
import ModalButton from '@components/ModalButton/ModalButton';
import TodoModal from '@components/Todo/TodoModal';
const TodoCardViewButtonGroup = ({ tagName, id }) => {
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

  const hoveringStyle = (bgColor, hoverBgColor, color = '#fff') => ({
    ...hoverEffect,
    backgroundColor: bgColor,
    color: color,
    '&:hover': {
      ...hoverEffect['&:hover'],
      backgroundColor: hoverBgColor,
      color: color,
    },
  });

  const buttonConfig = [
    tagName !== 'Completed' && {
      type: 'button',
      btnName: 'Delete',
      isDialogRequired: true,
      action: () =>
        openDialog(
          () => dispatch(deleteTodos(id)),
          setDialog((prev) => ({
            ...prev,
            isOpen: true,
            title: 'Are you sure you want to delete this todo item?',
            dialogContentText: 'Click confirm to delete and no to cancel',
          }))
        ),
      sx: hoveringStyle('d32f2f', 'b71c1c'),
    },
    tagName !== 'Completed' && {
      type: 'button',
      btnName: 'Complete',
      action: () =>
        openDialog(
          () => dispatch(completeTodo(id)),
          setDialog((prev) => ({
            ...prev,
            isOpen: true,
            title: 'Are you sure you want to complete this todo item?',
            dialogContentText: 'Click confirm to complete and no to cancel',
          }))
        ),
      sx: hoveringStyle('#388e3c', '#2e7d32'),
    },
    tagName !== 'Completed' && {
      type: 'modalButton',
      btnName: 'Update',
      isDialogRequired: true,
      dialogConfig: {
        title: 'Are you sure you want to cancel update this todo item?',
        dialogContentText: 'Click confirm to update and no to cancel',
      },
      buttonStyle: hoveringStyle('#bbdefb', '#90caf9', '#1976d2'),
    },
    tagName === 'Completed' && {
      type: 'modalButton',
      btnName: 'View',
      disabled: true,
      isDialogRequired: true,
      dialogConfig: {
        title: 'Are you sure you want to exit',
        dialogContentText: 'Click confirm to exit and no to cancel',
      },
      buttonStyle: hoveringStyle('#bbdefb', '#90caf9', '#1976d2'),
    },
  ];

  return (
    <>
      {buttonConfig.map((button, index) => {
        if (button?.type === 'button') {
          return (
            <Button
              key={index}
              btnName={button.btnName}
              onClick={button.action}
              sx={{
                ...button.sx,
                mx: 1,
              }}
            />
          );
        }
        if (button?.type === 'modalButton') {
          return (
            <ModalButton
              key={index}
              id={id}
              isDialogRequired={button.isDialogRequired}
              dialogConfig={button.dialogConfig}
              buttonText={button.btnName}
              buttonStyle={button.buttonStyle}
              disabled={button.disabled}
              sx={{
                ...button.sx,
                mx: 1,
              }}
            />
          );
        }
        return null;
      })}

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
