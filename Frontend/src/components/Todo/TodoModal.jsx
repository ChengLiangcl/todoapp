import React, { useMemo } from 'react';
import TodoForm from '../Form/todoForm/todoForm';
import { Box } from '@mui/material';
import Modal from '../Modal/Modal';
import { useModal } from '../../context/ModalContext';
import { useSelector } from 'react-redux';

const TodoModal = ({ title, id = null, action }) => {
  const { modal } = useModal();
  const todos = useSelector((state) => state.todo);

  // Memoize the current todo to avoid unnecessary re-renders
  const currentTodo = useMemo(() => {
    if (!id) return {};
    const result = todos?.todos?.find((todo) => todo._id === id);
    return result
      ? {
          title: result.title,
          content: result.content,
          startDate: result.startDate,
          dueDate: result.dueDate,
          files: result.files.filter(
            (file) => file.type === 'Todo support document'
          ),
          coverPhoto: result.files.filter(
            (file) => file.type === 'Cover photo'
          ),
        }
      : {};
  }, [id, todos?.todos]);

  return (
    <Modal title={title} isOpen={modal.isOpen}>
      <Box sx={{ p: 2 }}>
        <TodoForm initialValues={currentTodo} action={action} />
      </Box>
    </Modal>
  );
};

export default TodoModal;
