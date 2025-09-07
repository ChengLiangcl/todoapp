import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

/**
 * The ModalProvider component provides the ModalContext to its children,
 * which can then access the modal and dialog state and functions.
 *
 * The ModalContext includes the following values:
 *
 * - `modal`: an object with 3 properties:
 *   - `isOpen`: a boolean indicating whether the modal is open,
 *   - `content`: the content of the modal, which will be rendered
 *     inside the modal,
 *   - `onConfirm`: an optional function that will be called when the
 *     user clicks the "Confirm" button.
 *
 * - `openModal`: a function that opens the modal with the given content
 *   and onConfirm function.
 * - `closeModal`: a function that closes the modal.
 *
 * - `dialog`: an object with 3 properties:
 *   - `isOpen`: a boolean indicating whether the dialog is open,
 *   - `content`: the content of the dialog, which will be rendered
 *     inside the dialog,
 *   - `onConfirm`: an optional function that will be called when the
 *     user clicks the "Confirm" button.
 *
 * - `openDialog`: a function that opens the dialog with the given content
 *   and onConfirm function.
 * - `closeDialog`: a function that closes the dialog.
 * - `confirmDialog`: a function that calls the onConfirm function
 *   and closes the dialog.
 */
export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    onConfirm: null,
  });
  const [dialog, setDialog] = useState({
    isOpen: false,
    onConfirm: null,
    title: null,
    dialogContentText: null,
  });

  // Open modal
  const openModal = (onConfirm = null) => setModal({ isOpen: true, onConfirm });

  const closeModal = () => setModal({ isOpen: false, onConfirm: null });

  // Open dialog
  const openDialog = (onConfirm = null) =>
    setDialog((prev) => ({ ...prev, isOpen: true, onConfirm }));

  const closeDialog = () =>
    setDialog({
      isOpen: false,
      onConfirm: null,
      title: null,
      dialogContentText: null,
    });

  const confirmDialog = () => {
    typeof dialog.onConfirm === 'function' && dialog.onConfirm();
    setDialog((prev) => ({ ...prev, isOpen: false, onConfirm: null }));
  };

  const cancelDialog = () => {
    setDialog((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  };

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        dialog,
        setDialog,
        cancelDialog,
        openDialog,
        closeDialog,
        confirmDialog,
        setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
