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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const Input = ({
  type = 'text',
  id,
  label,
  icon,
  placeholder,
  error,
  autoComplete,
  validationFn, // keep to use internally or just omit it here
  options,
  variant = 'outlined',
  errorMessage,
  ...restProps // renamed from props to make clear
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = React.useState(dayjs());
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
        <DatePicker
          minDate={dayjs()} // <-- Disallow dates before today
          label={label}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              type={'text'}
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{ display: 'flex', flexGrow: 1 }}
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
      {...restProps}
    />
  );
};

export default Input;
