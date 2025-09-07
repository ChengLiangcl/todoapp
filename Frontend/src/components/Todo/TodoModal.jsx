import React, { use, useEffect, useState } from 'react';
import TodoForm from '../Form/todoForm/todoForm';
import { Box } from '@mui/material';
import ModalFormWrapper from '../ModalFormWrapper/ModalFormWrapper';
import Modal from '../Modal/Modal';
const TodoModal = ({ title, id = null }) => {
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    if (id) {
    } else {
      setInitialValues({});
    }
  }, [id]);

  return (
    <>
      <Modal title={title}>
        <Box sx={{ p: 2 }}>
          <ModalFormWrapper>
            <TodoForm initialValues={initialValues} />
          </ModalFormWrapper>
        </Box>
      </Modal>
    </>
  );
};

export default TodoModal;
