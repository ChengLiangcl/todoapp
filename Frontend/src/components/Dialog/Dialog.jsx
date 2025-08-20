import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
  title,
  dialogContentText,
  id,
  cancelBtnName = 'Cancel',
  confirmBtnName = 'Confirm',
  open,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0,0,0,0.2)' }, // lighter dim
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle id={id}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelBtnName}</Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmBtnName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
