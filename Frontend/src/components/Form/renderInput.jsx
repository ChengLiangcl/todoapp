import React from 'react';
import { Box } from '@mui/material';
import Input from '../Input/Input'; // your existing Input component

export default function RenderInput({
  field,
  value, // <- controlled value
  errors,
  changeHandler,
  onBlurHandler,
}) {
  const { Icon, name, type, helperText } = field;

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
        value={value} // <- controlled
        error={errors[name] || undefined}
        type={type}
        helperText={errors[name] ? helperText : ''}
        onChange={changeHandler}
        onBlur={onBlurHandler}
      />
    </Box>
  );
}
