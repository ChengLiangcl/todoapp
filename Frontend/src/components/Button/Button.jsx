import MaterialButton from '@mui/material/Button';
import React from 'react';

const Button = ({ btnName, type = 'button', size = 'medium', ...props }) => {
  return (
    <MaterialButton
      variant={type}
      size={size}
      type={type}
      {...props}
      sx={{ textTransform: 'none', ...props.sx }}
    >
      {btnName}
    </MaterialButton>
  );
};

export default Button;
