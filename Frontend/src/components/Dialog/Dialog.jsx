import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../../context/ModalContext';

function AlertDialog({
  title,
  dialogContentText,
  id,
  cancelBtnName = 'Cancel',
  confirmBtnName = 'Confirm',
}) {
  const { dialog, cancelDialog, confirmDialog } = useModal();
  if (!title) {
    title = 'Confirm';
  }
  return (
    dialog.isOpen && (
      <Dialog
        open={dialog.isOpen}
        hideBackdrop
        PaperProps={{
          elevation: 0, // remove default shadow
          style: {
            backgroundColor: '#fff',
            boxShadow: `
        0px 4px 12px rgba(0, 0, 0, 0.08), 
        0px 0px 8px rgba(255, 255, 255, 0.3)
      `,
            borderRadius: '8px', // optional for smooth look
          },
        }}
      >
        <DialogTitle id={id}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDialog}>{cancelBtnName}</Button>
          <Button onClick={confirmDialog} autoFocus>
            {confirmBtnName}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

// Wrap the component with React.memo here
export default React.memo(AlertDialog);
