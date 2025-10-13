import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ModalFormWrapper from '@components/ModalFormWrapper/ModalFormWrapper';
import todoValidator from '@components/Form/todoForm/todoValidator';
import RenderInput from '@components/Form/RenderInput';
import {
  todoFormFields,
  datePickerInput,
} from '@components/Form/todoForm/todoFormConfig';
import { Box } from '@mui/system';
import { useModal } from '@context/ModalContext';
import PhotoUploader from '@components/PhotoUploader/PhotoUploader';
import FileUploader from '@components/FileUploader/FileUploader';
import useInput from '@hooks/useInput';

// Shallow comparison to avoid unnecessary resets
export default function TodoForm({ initialValues, action }) {
  const {
    inputs,
    setInputs,
    errors,
    validateAll,
    onChangeHandler,
    onBlurHandler,
  } = useInput(initialValues, todoValidator);

  const { closeModal, modal } = useModal();

  // Update inputs only when initialValues changes
  useEffect(() => {
    if (!initialValues || Object.keys(initialValues).length === 0) return;

    setInputs(initialValues);
  }, [initialValues, setInputs]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const formData = new FormData();
    Object.entries(inputs).forEach(([key, value]) => {
      if (Array.isArray(value) && value[0] instanceof File) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });

    await action(formData);
    closeModal();
  };

  return (
    <ModalFormWrapper onSubmit={submitHandler}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {todoFormFields.map((field) => (
            <RenderInput
              key={field.name}
              field={field}
              value={inputs[field.name] || ''}
              error={errors[field.name]}
              onChangeHandler={onChangeHandler}
              onBlurHandler={onBlurHandler}
              disabled={modal.isFormDisabled}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}
          >
            {datePickerInput.map((field) => (
              <RenderInput
                key={field.name}
                field={field}
                value={inputs[field.name] || ''}
                error={errors[field.name]}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onBlurHandler}
                disabled={modal.isFormDisabled}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}
          >
            <FileUploader
              files={inputs.files}
              setFiles={setInputs}
              disabled={modal.isFormDisabled}
              name="files"
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <PhotoUploader
            maxFileSizeMB={5}
            disabled={modal.isFormDisabled}
            setCoverPhoto={setInputs}
            coverPhoto={inputs.coverPhoto}
            name="coverPhoto"
          />
        </Grid>
      </Grid>
    </ModalFormWrapper>
  );
}
