import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../../context/ModalContext';
export default function AlertDialog({
  title,
  dialogContentText,
  id,
  cancelBtnName = 'Cancel',
  confirmBtnName = 'Confirm',
  onConfirm,
}) {
  const { closeDialog, isDialogOpen, confirmDialog } = useModal();
  if (!title) {
    title = 'Confirm';
  }

  if (typeof onConfirm === 'undefined') {
    onConfirm = confirmDialog;
  }
  return (
    isDialogOpen && (
      <Dialog
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          },
        }}
        PaperProps={{
          sx: {
            boxShadow: 'none',
            borderRadius: 1,
          },
        }}
        open={isDialogOpen}
      >
        <DialogTitle id={id}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{cancelBtnName}</Button>
          <Button onClick={onConfirm} autoFocus>
            {confirmBtnName}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
