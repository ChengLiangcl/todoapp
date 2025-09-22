import React from 'react';
import { Grid } from '@mui/material';
import RenderInput from '../renderInput';
import { Box } from '@mui/system';
// import { inputReducer } from '../../../util/helper';
// import useForm from '../../../hooks/useForms';
import { todoFormFields, datePickerInput } from './todoFormConfig';
import { useModal } from '../../../context/ModalContext';
// import PhotoUploader from '../../PhotoUploader/PhotoUploader';
// import FileUploader from '../../FileUploader/FileUploader';
// import SelectInput from '@mui/material/Select/SelectInput';
import ModalFormWrapper from '../../ModalFormWrapper/ModalFormWrapper';

/**
 * @description A form component to create or edit a todo item. It takes `initialValues` and `action` as props.
 * @param {object} initialValues - An object with keys corresponding to the input fields and values to be used
 * as the initial values of the form.
 * @param {function} action - A function that will be called when the form is submitted.
 * @returns {React.Component} A form component with the todo item fields.
 */

import useInput from '../../../hooks/useInput';
export default function TodoForm({ initialValues = {}, action }) {
  // let todoObject = {
  //   ...inputReducer([...todoFormFields, ...datePickerInput]),
  // };
  // // if (Object.keys(initialValues).length > 0) {
  // //   todoObject = {
  // //     ...inputReducer([...todoFormFields, ...datePickerInput]),
  // //     ...Object.fromEntries(
  // //       Object.entries(initialValues).map(([key, value]) => [key, { value }])
  // //     ),
  // //   };
  // }

  const { inputs, errors, onChangeHandler, onBlurHandler, clickOnConfirm } =
    useInput(
      {
        title: '',
        content: '',
        startDate: '',
        dueDate: '',
      },
      {
        title: (value, _) => (value.length === 0 ? 'Title is required' : ''),
        content: (value, _) =>
          value.length === 0 ? 'content is required' : '',
        startDate: (value, inputs) => {
          const date = new Date(value);
          const currentDate = new Date();
          if (date < currentDate) {
            return 'Start date cannot be in the past';
          }
          const endDate = new Date(inputs.dueDate);
          if (date > endDate) {
            return 'Start date cannot be greater than end date';
          }
          if (date === endDate) {
            return 'Start date cannot be equal to end date';
          }

          return '';
        },
      }
    );

  const { modal } = useModal();
  const submitHandler = async (e) => {
    clickOnConfirm();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    modal.onConfirm(data);
  };

  // useEffect(() => {
  //   setInputs((prev) => {
  //     return {
  //       ...prev,
  //       files: { value: '', name: 'files' },
  //       coverPhoto: { value: '', name: 'files' },
  //     };
  //   });
  // }, [setInputs]);

  return (
    <>
      <ModalFormWrapper onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            {todoFormFields.map((field) => (
              <RenderInput
                key={field.name}
                field={field}
                value={inputs[field.name]}
                error={errors[field.name]}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onBlurHandler}
              />
            ))}
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}
            >
              {datePickerInput.map((field) => (
                <RenderInput
                  key={field.name}
                  field={field}
                  value={inputs[field.name]}
                  error={errors[field.name]}
                  onChangeHandler={onChangeHandler}
                  onBlurHandler={onBlurHandler}
                />
              ))}
            </Box>
          </Grid>
          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <FileUploader files={files} setFiles={setFiles} name={'files'} />
          </Box> */}

          {/* <PhotoUploader
            maxFileSizeMB={5}
            setCoverPhoto={setCoverPhoto}
            coverPhoto={coverPhoto}
            name={'coverPhoto'}
          /> */}
        </Grid>
      </ModalFormWrapper>
    </>
  );
}
