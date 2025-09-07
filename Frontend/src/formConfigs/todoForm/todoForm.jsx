import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import RenderInput from '../renderInput';
import { Box } from '@mui/system';
import { inputReducer } from '../../../util/helper';
import useForm from '../../../hooks/useForms';
import { todoFormFields, datePickerInput } from './todoFormConfig';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../../store/todoSlice';
import { useModal } from '../../../context/ModalContext';
export default function TodoForm({ initialValues = {} }) {
  const dispatch = useDispatch();
  const { setModal } = useModal();
  let todoObject = {
    ...inputReducer([...todoFormFields, ...datePickerInput]),
  };
  if (Object.keys(initialValues).length > 0) {
    todoObject = {
      ...inputReducer([...todoFormFields, ...datePickerInput]),
      ...Object.fromEntries(
        Object.entries(initialValues || {}).map(([key, value]) => [
          key,
          { value },
        ])
      ),
    };
  }

  const { errors, changeHandler, onBlurHandler, inputs, onSubmit } =
    useForm(todoObject);

  useEffect(() => {
    setModal((prev) => ({
      ...prev,
      onConfirm: (e) => onSubmit(e, (form) => dispatch(addTodo(form))),
    }));
  }, [setModal, dispatch, onSubmit]);
  useEffect(() => {
    console.log('Inputs updated:', inputs);
  }, [inputs]);
  return (
    <>
      {todoFormFields.map((field) => (
        <RenderInput
          key={field.name}
          field={field}
          value={inputs[field.name]?.value || ''}
          errors={errors}
          changeHandler={changeHandler}
          onBlurHandler={onBlurHandler}
        />
      ))}

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
            {datePickerInput.map((field) => (
              <RenderInput
                key={field.name}
                field={field}
                value={inputs[field.name]?.value || ''} // <-- and here too
                errors={errors}
                changeHandler={changeHandler}
                onBlurHandler={onBlurHandler}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
