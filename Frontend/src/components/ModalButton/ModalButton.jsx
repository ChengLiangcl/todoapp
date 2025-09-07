import React from 'react';
import Button from '../Button/Button';
import { useModal } from '../../context/ModalContext';
import AlertDialog from '../Dialog/Dialog';
export default function ModalButton({
  buttonText,
  children,
  buttonStyle = {},
  btnDivStyle = {},
  isDialogRequired = false,
  id = null,
  onConfirm = null,
  dialogConfig = {},
}) {
  const { modal, openModal, dialog, setDialog } = useModal();

  const clickHandler = () => {
    if (isDialogRequired) {
      setDialog((prev) => ({
        ...prev,
        title: dialogConfig.title,
        dialogContentText: dialogConfig.dialogContentText,
      }));
    }
    openModal(onConfirm);
  };

  return (
    <div style={btnDivStyle}>
      <Button
        btnName={buttonText}
        id={id}
        onClick={clickHandler}
        sx={buttonStyle}
      />
      {modal.isOpen && children}
      <AlertDialog
        dialogContentText={dialog.dialogContentText}
        title={dialog.title}
      />
    </div>
  );
}
