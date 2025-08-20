import React, { useEffect, useState } from 'react';
import TodoForm from '../Form/todoForm/todoForm';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AlertDialog from '../Dialog/Dialog';
import ModalFormWrapper from '../ModalFormWrapper/ModalFormWrapper';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todoSlice';

const TodoModal = ({
  open,
  onClose,
  id = null,
  title = 'Modal Title',
  loadTodoInfo,
  modalConfig = { modalWidth: '50%', modalHeight: '50%' },
  dialogConfig = { title: 'Todo Title', content: 'Are you sure?' },
}) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  // Load todo info only when id changes
  useEffect(() => {
    if (typeof loadTodoInfo === 'function' && id) {
      setInitialValues(loadTodoInfo(id));
    } else {
      setInitialValues({});
    }
  }, [loadTodoInfo, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    dispatch(addTodo(formData));
    onClose();
  };

  const dialogConfirmHandler = () => {
    onClose();
    setShowDialog(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setShowDialog(true)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            width: modalConfig.modalWidth,
            maxHeight: '90%',
            height: modalConfig.modalHeight,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            outline: 'none',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ddd',
              p: 2,
              flexShrink: 0,
            }}
          >
            <Typography id="modal-title" variant="h6">
              {title}
            </Typography>
            <IconButton onClick={() => setShowDialog(true)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <Box sx={{ p: 2 }}>
            <ModalFormWrapper
              onSubmit={handleSubmit}
              handleClose={() => setShowDialog(true)}
            >
              <TodoForm initialValues={initialValues} />
            </ModalFormWrapper>
          </Box>
        </Box>
      </Modal>

      <AlertDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        title={dialogConfig.title}
        content={dialogConfig.content}
        onConfirm={dialogConfirmHandler}
        onCancel={() => setShowDialog(false)}
      />
    </>
  );
};

export default TodoModal;
