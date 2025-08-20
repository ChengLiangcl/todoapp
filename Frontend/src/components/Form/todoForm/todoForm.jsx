import React from 'react';
import { Grid } from '@mui/material';
import RenderInput from '../renderInput';
import { Box } from '@mui/system';
import { inputReducer } from '../../../util/helper';
import useForm from '../../../hooks/useForms';
import { todoFormFields, datePickerInput } from './todoFormConfig';
export default function TodoForm({ initialValues = {} }) {
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

  const { errors, changeHandler, onBlurHandler, inputs } = useForm(todoObject);
  return (
    <>
      {todoFormFields.map((field) => (
        <RenderInput
          key={field.name}
          field={field}
          value={inputs[field.name]?.value || ''} // <-- and here too
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
