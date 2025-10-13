import React from 'react';
import { Box } from '@mui/material';
import Input from '../Input/Input'; // your existing Input component
export default function RenderInput({
  field,
  value, // <- controlled value
  error,
  onChangeHandler,
  onBlurHandler,
  disabled = false,
}) {
  const { Icon, name, type } = field;
  return (
    <Box
      key={name}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        gap: '15px',
        width: '100%',
      }}
    >
      {Icon && (
        <Icon sx={{ minWidth: '40px', fontSize: '25px' }} color="primary" />
      )}
      <Input
        {...field}
        fullWidth
        value={value}
        error={!error ? false : true}
        type={type}
        helperText={error}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        disabled={disabled}
      />
    </Box>
  );
}
