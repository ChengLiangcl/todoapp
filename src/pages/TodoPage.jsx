import * as React from 'react';
import { Box, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';

import ModalButton from '../components/ModalButton/ModalButton';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import CardView from '../components/CardView/CardView';
import MyDatePicker from '../components/DatePicker/DatePickers';
import Uploader from '../components/Uploader/Uploader';

import useForm from '../hooks/useForm';
import { inputReducer } from '../util/helper';
import { isRequired, validateStartAndEndDate } from '../util/validaiton';
import dayjs from 'dayjs';

const TodoPage = () => {
  const [startDate, setStartDate] = React.useState(dayjs());
  const [dueDate, setDueDate] = React.useState(dayjs().add(1, 'day'));

  // 2. Compare dates and decide if error exists
  const isDateRangeInvalid = validateStartAndEndDate(startDate, dueDate);

  const todoInput = [
    {
      label: 'Todo Title',
      name: 'title',
      type: 'text',
      placeholder: 'Enter your todo title',
      helperText: 'Please enter your todo title',
      Icon: TitleIcon,
      validationFn: isRequired,
    },
    {
      label: 'Todo item Description',
      name: 'content',
      type: 'textarea',
      placeholder: 'Enter your todo description',
      helperText: 'The description of your todo cannot be empty',
      validationFn: isRequired,
      Icon: DescriptionIcon,
    },
  ];

  const todoObject = inputReducer(todoInput);
  const {
    inputs,
    changeHandler,
    blurHandler,
    formSubmissionHandler,
    resetInputs,
  } = useForm(todoObject);

  // ✅ Reusable input renderer
  const renderInput = (field) => {
    const { Icon } = field;
    return (
      <Box
        key={field.name}
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
          error={inputs[field.name].error || undefined}
          type={field.type}
          helperText={
            inputs[field.name].error ? inputs[field.name].helperText : ''
          }
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          p: 2,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <FormControl sx={{ minWidth: 150 }} size="small">
          <Input
            options={['All', 'Work', 'Personal', 'Urgent']}
            type="select"
            label="Todo Category"
            id="categoryFilter"
          />
        </FormControl>
        <Input
          variant="outlined"
          size="small"
          placeholder="Search keyword..."
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none' }}
          btnName="Apply Filter"
        />
      </Box>

      <ModalButton
        buttonText="Add Todo Item"
        formId="todoForm"
        reset={resetInputs}
        buttonStyle={{
          textTransform: 'none',
          marginTop: { xs: '10px' },
          marginRight: '10px',
        }}
        btnDivStyle={{ display: 'flex', justifyContent: 'flex-end' }}
        title="Add Todo Item"
        onSubmit={(e) => formSubmissionHandler(e, 'todos')}
      >
        {todoInput.map(renderInput)}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
              }}
            >
              <DateRangeIcon
                sx={{ minWidth: '40px', fontSize: '25px' }}
                color="primary"
              />
              <MyDatePicker
                label="Start date"
                name="startDate"
                validationFn={validateStartAndEndDate()}
                onChange={setStartDate}
                error={!isDateRangeInvalid ? true : false}
                value={startDate}
                helperText={
                  !isDateRangeInvalid
                    ? 'Start date must be before due date or cannot be the same'
                    : undefined
                }
              />
              <MyDatePicker
                label="Due date"
                name="dueDate"
                value={dueDate}
                onChange={setDueDate}
              />
            </Box>
          </Grid>

          {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Uploader />
          </Grid> */}
        </Grid>
      </ModalButton>

      {/* 🔹 Todo List */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <CardView />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TodoPage;
