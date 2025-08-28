import React from 'react';
import './LoginPage.module.css';
import { useEffect } from 'react';
import Form from '../components/Form/Form';
import { Box, Container } from '@mui/material';
// import useForm from '../hooks/useForm';
import useForm from '../hooks/useForms';
import {
  initial,
  BackDropButton,
  SignupHeading,
  SignupPageInput,
  Alert,
  SignupButton,
} from '../formConfigs/signupForm/signupFormConfig';
import useHttpRequest from '../hooks/useHttpRequest';
import { postRequest } from '../util/http';

const SignupPage = () => {
  const { triggerRequest, loading, data, error } = useHttpRequest(postRequest);

  const {
    inputs,
    errors,
    changeHandler,
    onBlurHandler,
    validateAll,
    onSubmit,
    reset,
  } = useForm(initial, triggerRequest);

  const buttonDisabled = validateAll() ? false : true;

  const bannerVisible = data || error;
  const bannerType = error ? 'error' : 'success';

  const alertMessage = error
    ? error
    : `User ${data?.username} created successfully!, please go to login page `;

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  return (
    <>
      {<BackDropButton />}
      <Container sx={{ maxWidth: 800, width: 600, justifyContent: 'center' }}>
        {<SignupHeading />}
        <Form method="post" onSubmit={(e) => onSubmit(e, 'auth/register')}>
          <Box
            sx={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '30px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: 3,
            }}
          >
            <SignupPageInput
              inputs={inputs}
              errors={errors}
              changeHandler={changeHandler}
              onBlurHandler={onBlurHandler}
            />
            <SignupButton buttonDisabled={buttonDisabled} />
            <Alert
              severity={bannerType}
              visible={bannerVisible}
              message={alertMessage}
            />
          </Box>
        </Form>
      </Container>
    </>
  );
};

export default SignupPage;
