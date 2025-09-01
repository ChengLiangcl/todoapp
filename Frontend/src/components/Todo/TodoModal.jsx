import React, { useEffect, useState } from 'react';
import TodoForm from '../Form/todoForm/todoForm';
import { Box } from '@mui/material';
import AlertDialog from '../Dialog/Dialog';
import ModalFormWrapper from '../ModalFormWrapper/ModalFormWrapper';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todoSlice';
import { useModal } from '../../context/ModalContext';
import Modal from '../Modal/Modal';
const TodoModal = ({ title, onClose, id = null, loadTodoInfo }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({});
  // Load todo info only when id changes
  console.log(id);

  useEffect(() => {
    if (id) {
      console.log('Loading todo info for id in TodoModal:', id);
    } else {
      setInitialValues({});
    }
  }, [id]);
  const { openDialog, isDialogOpen, dialogContent } = useModal();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    dispatch(addTodo(formData));
    onClose();
  };
  console.log('test');

  const closeHandler = () => {
    openDialog(
      <AlertDialog
        title="Are you sure you want to close this form?"
        dialogContentText="Click Yes to close this form, or No to cancel the action."
      />
    );
  };

  return (
    <>
      <Modal onClose={closeHandler} title={title}>
        <Box sx={{ p: 2 }}>
          <ModalFormWrapper onSubmit={handleSubmit} handleClose={closeHandler}>
            <TodoForm initialValues={initialValues} />
          </ModalFormWrapper>
        </Box>
      </Modal>
      {/* {isDialogOpen && dialogContent} */}
    </>
  );
};

export default TodoModal;
