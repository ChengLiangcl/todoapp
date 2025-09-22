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
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

const Input = ({
  type = 'text',
  id,
  label,
  icon,
  Icon,
  placeholder,
  error,
  autoComplete,
  validationFn, // keep to use internally or just omit it here
  options,
  variant = 'outlined',
  errorMessage,
  name,
  ...restProps
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
        autoComplete={autoComplete || 'new-password'}
        InputLabelProps={{ shrink: true }}
        name={name}
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
        <Select name={name} value={restProps.value || ''} {...restProps}>
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
        name={name}
        maxRows={8}
        error={error}
        InputLabelProps={{ shrink: true }}
        fullWidth
        variant={variant}
        {...restProps}
      />
    );
  }

  if (type === 'date') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDateTimePicker
          label={label}
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          value={restProps.value ? dayjs(restProps.value) : null}
          inputFormat="YYYY-MM-DD HH:mm:ss"
          onChange={(newValue) => {
            restProps.onChange?.({
              target: {
                name,
                value: newValue?.format('YYYY-MM-DD HH:mm:ss') || '',
              },
            });
          }}
          onClose={() => {
            restProps.onBlur?.({ target: { name } });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              error={error}
              fullWidth
              helperText={error ? restProps.helperText : ''}
              onBlur={(e) => {
                restProps.onBlur?.(e);
              }}
            />
          )}
        />
      </LocalizationProvider>
    );
  }
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      error={error}
      InputLabelProps={{ shrink: true }}
      autoComplete={autoComplete || 'off'}
      name={name}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

export default Input;
