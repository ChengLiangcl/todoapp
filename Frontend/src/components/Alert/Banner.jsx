import React, { useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Banner({
  visible,
  message,
  severity = 'success',
  children,
  ...props
}) {
  const [open, setOpen] = useState(true);
  if (!visible || !message) {
    return null;
  }
  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        {...props}
        onClick={() => setOpen(false)}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // prevent the alert's onClick firing
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={({ cursor: 'pointer' }, { ...props.sx })}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
