import MaterialButton from '@mui/material/Button';
import React from 'react';

const Button = React.forwardRef(
  (
    {
      btnName,
      type = 'button',
      size = 'medium',
      variant = 'contained',
      ...props
    },
    ref
  ) => {
    return (
      <MaterialButton
        ref={ref}
        variant={variant}
        size={size}
        type={type}
        {...props}
        sx={{ textTransform: 'none', ...props.sx }}
        startIcon={props.startIcon ? props.startIcon : null}
        endIcon={props.endIcon ? props.endIcon : null}
        onClick={props.onClick}
      >
        {btnName}
      </MaterialButton>
    );
  }
);

export default Button;
