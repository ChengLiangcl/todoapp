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
  const form = useForm(inputReducer([...todoFormFields, ...datePickerInput]));
  const { inputs, errors, changeHandler, onBlurHandler, onSubmit, setInputs } =
    form;

  // Reset form whenever initialValues change (like when editing a new todo)
  useEffect(() => {
    if (Object.keys(initialValues).length === 0) return;
    setInputs((prev) => {
      const updated = { ...prev };
      Object.entries(initialValues).forEach(([key, value]) => {
        if (updated[key]) {
          updated[key] = { ...updated[key], value }; // keep old validationFn, etc.
        }
      });
      return updated;
    });
  }, [initialValues, setInputs]);

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
