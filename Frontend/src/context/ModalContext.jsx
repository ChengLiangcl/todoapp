// context/ModalContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const openDialog = useCallback(
    (content) => {
      setDialogContent(content);
      setIsDialogOpen(true);
    },
    [setDialogContent, setIsDialogOpen]
  );

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogContent(null);
  };

  const closeModalWithDialog = () => {
    setIsDialogOpen(true);
  };

  const confirmDialog = () => {
    setIsDialogOpen(false);
    setIsModalOpen(false);
    setDialogContent(null);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
        isDialogOpen,
        dialogContent,
        openDialog,
        closeDialog,
        closeModalWithDialog,
        confirmDialog,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
