import React from 'react';
import Button from '../Button/Button';

export default function ModalButton({
  buttonText,
  children,
  buttonStyle = {},
  btnDivStyle = {},
  id = null,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const modalComponent = React.isValidElement(children)
    ? React.cloneElement(children, { open: isOpen, onClose })
    : null;

  return (
    <div style={btnDivStyle}>
      <Button btnName={buttonText} id={id} onClick={onOpen} sx={buttonStyle} />
      {modalComponent}
    </div>
  );
}
