import React from 'react';
import Button from '../Button/Button';
import { useModal } from '../../context/ModalContext';
import AlertDialog from '../Dialog/Dialog';

export default function ModalButton({
  buttonText,
  buttonStyle = {},
  btnDivStyle = {},
  isDialogRequired = false,
  dialogConfig = {},
  disabled = false,
  id,
}) {
  const { setModal, openModal, dialog, setDialog } = useModal();

  const clickHandler = () => {
    if (isDialogRequired) {
      setDialog((prev) => ({
        ...prev,
        title: dialogConfig.title,
        dialogContentText: dialogConfig.dialogContentText,
      }));
    }
    if (id) {
      setModal((prev) => ({ ...prev, modalId: id }));
    }
    //If try to disable the form
    if (disabled) {
      openModal(null, true);
    } else {
      openModal();
    }
  };

  return (
    <div sx={btnDivStyle}>
      <Button btnName={buttonText} onClick={clickHandler} sx={buttonStyle} />
      <AlertDialog
        dialogContentText={dialog.dialogContentText}
        title={dialog.title}
      />
    </div>
  );
}
