import MaterialButton from '@mui/material/Button';
import React from 'react';

const Button = ({ btnName, type = 'text', size = 'medium', ...props }) => {
  return (
    <MaterialButton
      variant={type}
      size={size}
      {...props}
      sx={{ textTransform: 'none', ...props.sx }}
    >
      {btnName}
    </MaterialButton>
  );
};

export default Button;
