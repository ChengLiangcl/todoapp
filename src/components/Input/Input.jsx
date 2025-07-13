import { useState } from 'react';
import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = ({
  type = 'text',
  id,
  label,
  icon,
  helperText,
  error,
  autoComplete,
  validationFn, // keep to use internally or just omit it here
  ...restProps // renamed from props to make clear
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  if (type === 'password') {
    return (
      <TextField
        id={id}
        label={label}
        type={showPassword ? 'text' : 'password'}
        error={error}
        helperText={helperText}
        autoComplete={autoComplete || 'new-password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          ...(restProps.InputProps || {}),
        }}
        {...restProps} // restProps excludes validationFn now
      />
    );
  }

  return (
    <TextField
      id={id}
      label={label}
      type={type}
      error={error}
      helperText={helperText}
      autoComplete={autoComplete || 'off'}
      {...restProps}
    />
  );
};

export default Input;
