import React from 'react';
import Button from '../Button/Button';
import { useModal } from '../../context/ModalContext';
export default function ModalButton({
  buttonText,
  children,
  buttonStyle = {},
  btnDivStyle = {},
  id = null,
}) {
  const clickHandler = () => {
    if (React.isValidElement(children)) {
      openModal(React.cloneElement(children));
    }
  };

  const { isModalOpen, openModal, modalContent } = useModal();
  return (
    <div style={btnDivStyle}>
      <Button
        btnName={buttonText}
        id={id}
        onClick={clickHandler}
        sx={buttonStyle}
      />
      {isModalOpen && modalContent}
    </div>
  );
}
