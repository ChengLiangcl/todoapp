import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import RenderInput from '../renderInput';
import { Box } from '@mui/system';
import { inputReducer } from '../../../util/helper';
import useForm from '../../../hooks/useForms';
import { todoFormFields, datePickerInput } from './todoFormConfig';
import { useModal } from '../../../context/ModalContext';

/**
 * @description A form component to create or edit a todo item. It takes `initialValues` and `action` as props.
 * @param {object} initialValues - An object with keys corresponding to the input fields and values to be used
 * as the initial values of the form.
 * @param {function} action - A function that will be called when the form is submitted.
 * @returns {React.Component} A form component with the todo item fields.
 */
export default function TodoForm({ initialValues = {}, action }) {
  let todoObject = {
    ...inputReducer([...todoFormFields, ...datePickerInput]),
  };
  if (Object.keys(initialValues).length > 0) {
    todoObject = {
      ...inputReducer([...todoFormFields, ...datePickerInput]),
      ...Object.fromEntries(
        Object.entries(initialValues).map(([key, value]) => [key, { value }])
      ),
    };
  }

  const { errors, changeHandler, onBlurHandler, inputs, onSubmit } =
    useForm(todoObject);

  const { setModal } = useModal();

  useEffect(() => {
    setModal((prev) => ({
      ...prev,
      onConfirm: (e) => onSubmit(e, action),
    }));
  }, [action, onSubmit, setModal]);

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {datePickerInput.map((field) => (
              <RenderInput
                key={field.name}
                field={field}
                value={inputs[field.name]?.value || ''}
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
