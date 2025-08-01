import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
export default function MyDatePicker({ label, name, props }) {
  const [value, setValue] = React.useState(dayjs());

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
            size="small"
            sx={{ display: 'flex', flexGrow: 1 }}
            name={name}
          />
        )}
      />
    </LocalizationProvider>
  );
}
