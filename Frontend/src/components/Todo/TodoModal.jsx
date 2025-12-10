import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import Modal from '../Modal/Modal';
import TodoForm from '../Form/todoForm/todoForm';
import { useModal } from '../../context/ModalContext';

const TodoModal = ({ title, action, todoData }) => {
  const { modal } = useModal();

  const initialValues = useMemo(() => {
    if (!modal.modalId)
      return {
        title: '',
        content: '',
        startDate: '',
        dueDate: '',
        files: [],
        coverPhoto: [],
      };

    if (Object.keys(todoData).length === 0)
      return {
        title: '',
        content: '',
        startDate: '',
        dueDate: '',
        files: [],
        coverPhoto: [],
      };

    return {
      title: todoData.title || '',
      content: todoData.content || '',
      startDate: todoData.startDate || '',
      dueDate: todoData.dueDate || '',
      files:
        todoData.files?.filter((f) => f.type === 'Todo support document') || [],
      coverPhoto: todoData.files?.filter((f) => f.type === 'Cover photo') || [],
    };
  }, [modal.modalId, todoData]);

  return (
    <Modal title={title} isOpen={modal.isOpen}>
      <Box sx={{ p: 2 }}>
        <TodoForm initialValues={initialValues} action={action} />
      </Box>
    </Modal>
  );
};

export default TodoModal;
