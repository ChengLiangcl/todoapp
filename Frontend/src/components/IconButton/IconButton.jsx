import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const CustomIconButton = ({
  icon: Icon,
  iconProps = {},
  buttonProps = {},
  to, // optional: if defined, button becomes a link
}) => {
  const ButtonComponent = to ? Link : 'button';

  return (
    <IconButton
      {...buttonProps}
      component={ButtonComponent}
      to={to}
      sx={{
        padding: '12px',
        ...buttonProps.sx,
      }}
    >
      <Icon
        {...iconProps}
        sx={{
          fontSize: '32px',
          ...iconProps.sx,
        }}
      />
    </IconButton>
  );
};

export default CustomIconButton;
