import React, { useEffect, useState } from 'react';
import TodoForm from '../Form/todoForm/todoForm';
import { Box } from '@mui/material';
import ModalFormWrapper from '../ModalFormWrapper/ModalFormWrapper';
import Modal from '../Modal/Modal';
import { useModal } from '../../context/ModalContext';
const TodoModal = ({ title, id = null, action }) => {
  const [initialValues, setInitialValues] = useState({});
  const { modal } = useModal();

  useEffect(() => {
    if (id) {
    } else {
      setInitialValues({});
    }
  }, [id]);

  return (
    <>
      <Modal title={title} isOpen={modal.isOpen}>
        <Box sx={{ p: 2 }}>
          <ModalFormWrapper>
            <TodoForm initialValues={initialValues} action={action} />
          </ModalFormWrapper>
        </Box>
      </Modal>
    </>
  );
};

export default TodoModal;
