import React, { useEffect, useState } from 'react';
import TodoForm from '../Form/todoForm/todoForm';
import { Box } from '@mui/material';
import Modal from '../Modal/Modal';
import { useModal } from '../../context/ModalContext';
const TodoModal = ({ title, id = null, action }) => {
  const [initialValues, setInitialValues] = useState({});
  const { modal, setModal } = useModal();

  useEffect(() => {
    if (id) {
    } else {
      setInitialValues({});
    }
  }, [id]);

  useEffect(() => {
    setModal((prev) => ({
      ...prev,
      onConfirm: (data) => action(data), // captures the current form data
    }));
  }, [setModal, action]);

  return (
    <>
      <Modal title={title} isOpen={modal.isOpen}>
        <Box sx={{ p: 2 }}>
          <TodoForm initialValues={initialValues} action={action} />
        </Box>
      </Modal>
    </>
  );
};

export default TodoModal;
