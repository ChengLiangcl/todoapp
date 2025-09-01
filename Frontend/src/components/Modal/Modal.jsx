import { Modal as MuiModal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from '../../context/ModalContext';
const Modal = ({
  onClose,
  id = null,
  title = 'Modal Title',
  modalConfig = { modalWidth: '50%', modalHeight: '50%' },
  children,
}) => {
  const { isModalOpen, openDialog } = useModal();

  return (
    <>
      <MuiModal
        open={isModalOpen}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
        }}
      >
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
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
      </MuiModal>
    </>
  );
};

export default Modal;
