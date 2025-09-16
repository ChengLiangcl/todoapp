import React, { useEffect, useState } from 'react';
import TodoForm from '../Form/todoForm/todoForm';
import { Box } from '@mui/material';
import ModalFormWrapper from '../ModalFormWrapper/ModalFormWrapper';
import Modal from '../Modal/Modal';
import { useModal } from '../../context/ModalContext';
import { useSelector } from 'react-redux';
const TodoModal = ({
  title,
  id = null,
  action,
  initialValues: formValues = {},
}) => {
  const [initialValues, setInitialValues] = useState(formValues || {});
  const { modal } = useModal();
  const { todos } = useSelector((state) => state.todo);
  useEffect(() => {
    if (!id) return;

    const currentTodo = todos.find((todo) => todo._id === id);

    if (!currentTodo) return {};
    const { title, content, startDate, dueDate } = currentTodo;
    if (currentTodo) setInitialValues({ title, content, startDate, dueDate });
  }, [id, todos]);

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
