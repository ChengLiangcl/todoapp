import { useState } from 'react';
import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
const Input = ({
  type = 'text',
  id,
  label,
  icon,
  placeholder,
  helperText,
  error,
  autoComplete,
  validationFn, // keep to use internally or just omit it here
  options,
  variant = 'outlined',
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

  if (type === 'select') {
    return (
      <>
        <InputLabel id={id}>{label}</InputLabel>
        <Select value={restProps.value || ''} {...restProps}>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  }

  if (type === 'textarea') {
    return (
      <TextField
        label={label}
        multiline
        minRows={4}
        maxRows={8}
        error={error}
        helperText={helperText}
        fullWidth
        variant={variant}
        {...restProps}
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
