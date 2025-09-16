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
export default function TodoForm({ initialValues = {}, action }) {
  const { setModal } = useModal();

  const {
    createFormInputs,
    errors,
    changeHandler,
    onBlurHandler,
    inputs,
    onSubmit,
  } = useForm(initialValues);

  useEffect(() => {
    setModal((prev) => ({
      ...prev,
      onConfirm: async (e) => {
        await onSubmit(e, (formData) => {
          if (typeof action === 'function') {
            return action(formData); // Make sure action returns a promise
          }
        });
      },
    }));
  }, [setModal, onSubmit, action]);

  useEffect(() => {
    createFormInputs([...todoFormFields, ...datePickerInput]);
  }, [createFormInputs]);

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
