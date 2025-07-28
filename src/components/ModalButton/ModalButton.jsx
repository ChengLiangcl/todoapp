import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Button/Button';
import { useState } from 'react';

export default function ModalButton({
  buttonStyle = {},
  variant = 'contained',
  buttonText,
  btnDivStyle = {},
  children,
  modalWidth = '50%',
  modalHeight = '50%',
  title = 'Modal Title',
  formId,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formHandler = (e) => {
    e.preventDefault();

    // ✅ Use e.currentTarget to get the <form> element safely
    const formElement = e.currentTarget;
    console.log('Form Element:', formElement);

    // Example: Get all form data
    const formData = new FormData(formElement);
    console.log(formData);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    setOpen(false);
  };

  return (
    <div style={btnDivStyle}>
      <Button
        btnName={buttonText}
        variant={variant}
        onClick={handleOpen}
        sx={buttonStyle}
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            width: modalWidth,
            height: modalHeight,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            outline: 'none',
          }}
        >
          {/* Header */}
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
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <form
            id={formId || 'todoForm'}
            onSubmit={formHandler}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              overflow: 'hidden',
            }}
          >
            {/* Scrollable content */}
            <Box
              sx={{
                flexGrow: 1,
                p: 3,
                overflowY: 'auto',
              }}
            >
              {children}
            </Box>

            {/* Footer */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderTop: '1px solid #ddd',
                flexShrink: 0,
              }}
            >
              <Button
                btnName="Close"
                color="error"
                variant="contained"
                onClick={handleClose}
              />
              <Button
                btnName="Confirm"
                color="primary"
                variant="contained"
                type="submit"
              />
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
