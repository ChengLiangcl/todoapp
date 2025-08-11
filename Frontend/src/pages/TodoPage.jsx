import * as React from 'react';
import { Box, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CustomizedPagination from '../components/Pagination/CustomizedPagination';
import ModalButton from '../components/ModalButton/ModalButton';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import CardView from '../components/CardView/CardView';
import MyDatePicker from '../components/DatePicker/DatePickers';
import Uploader from '../components/Uploader/Uploader';
import useForm from '../hooks/useForms';
import { inputReducer } from '../util/helper';
import { isRequired, validateStartAndEndDate } from '../util/validaiton';
import dayjs from 'dayjs';
import { postRequest } from '../util/http';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from '../store/todoSlice';
import Loader from '../components/Loader/Loader';

const TodoPage = () => {
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

  const datePickerInput = [
    {
      label: 'Start date',
      name: 'startDate',
      type: 'date',
      placeholder: 'Choose the todo start date',
      helperText:
        'The start date cannot be greater than or equal to the due date',
      validationFn: validateStartAndEndDate,
      Icon: DateRangeIcon,
    },
    {
      label: 'End date',
      name: 'dueDate',
      type: 'date',
      placeholder: 'Choose the todo end date',
      helperText: 'The description of your todo cannot be empty',
      validationFn: validateStartAndEndDate,
      Icon: DateRangeIcon,
    },
  ];
  const dispatch = useDispatch();

  const { todos, loading, error } = useSelector((state) => state.todo);
  const todoObject = inputReducer([...todoInput, ...datePickerInput]);
  const handleAddTodo = (data) => dispatch(addTodo(data));

  const {
    inputs,
    errors,
    changeHandler,
    onBlurHandler,
    onSubmit,
    resetInputs,
  } = useForm(todoObject, postRequest);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <Loader>Fetching the todos...</Loader>;
  }
  console.log(loading);
  if (error) {
    return <h1>Something went wrong</h1>;
  }

  const renderInput = (field) => {
    const { Icon, name } = field;
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
          error={errors[name] || undefined}
          type={field.type}
          helperText={errors[name] ? field.helperText : ''}
          onChange={changeHandler}
          onBlur={onBlurHandler}
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
        onSubmit={(e) => onSubmit(e, 'todos')}
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
              {datePickerInput.map(renderInput)}
            </Box>
          </Grid>

          {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Uploader />
          </Grid> */}
        </Grid>
      </ModalButton>
      <Box>
        <Grid
          container
          spacing={3}
          sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
        >
          {todos.map((todo, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CardView title={todo.title} content={todo.content} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <CustomizedPagination />
    </>
  );
};

export default TodoPage;
