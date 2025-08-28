import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useEffect } from 'react';

const ModalContent = ({
  open,
  handleClose,
  children,
  modalHeight = '50%',
  modalWidth = '50%',
  title = 'Modal Title',
}) => {
  const modalRef = useRef(null);

  // Focus first input when modal opens
  useEffect(() => {
    if (open) {
      const firstInput = modalRef.current?.querySelector(
        'input, textarea, select, button'
      );
      firstInput?.focus();
    }
  }, [open]);
  // Handle ESC key to close
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClose();
  };

  return (
    <Modal
      open={!!open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return; // prevent backdrop click
        handleClose();
      }}
      onKeyDown={handleKeyDown}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        ref={modalRef}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          width: modalWidth,
          maxHeight: '90%',
          height: modalHeight,
          borderRadius: 2,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
          overflowY: 'auto', // scroll if content is large
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
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default ModalContent;
