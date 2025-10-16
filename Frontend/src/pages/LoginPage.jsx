import React from 'react';
import './LoginPage.module.css';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import { Box, Typography, Container } from '@mui/material';
import TextLink from '../components/TextLink/TextLink';
import Button from '../components/Button/Button';
import {
  inputList,
  inputObject,
} from '../formConfigs/loginForm/loginFormConfig';
import useForm from '../hooks/useForm';
import Banner from '../components/Alert/Banner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import { setToken } from '../util/auth';
/**
 * LoginPage component.
 *
 * Renders a centered box with a form containing username and password fields.
 * The form also contains a Sign In button, a Forgot Password link, and a Need
 * a account? Sign Up link.
 *
 * @return {ReactElement} The rendered component.
 */
const LoginPage = () => {
  const {
    inputs,
    changeHandler,
    blurHandler,
    formSubmissionHandler,
    data,
    error,
    loading,
  } = useForm(inputObject);
  const bannerVisible = data || error;

  const bannerType = error ? 'error' : 'success';
  const alertMessage = error
    ? error
    : `Login successfully!, it will redirect to homepage`;
  const navigate = useNavigate();

  const alert = (
    <Banner
      sx={{ marginTop: '20px' }}
      severity={bannerType}
      visible={bannerVisible}
      message={alertMessage}
    />
  );
  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);
  useEffect(() => {
    if (bannerVisible && !error) {
      setToken(data);
      navigate('/dashboard');
    }
  }, [bannerVisible, error, data, navigate]);
  return loading ? (
    <Loader>Verify your information please wait.....</Loader>
  ) : (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        sx={{ color: '#333333', marginBottom: '30px' }}
      >
        Sign In
      </Typography>
      <Form
        method="POST"
        onSubmit={(e) => formSubmissionHandler(e, 'auth/login')}
      >
        <Box
          sx={{
            padding: '30px',
            borderRadius: '12px',
            boxShadow: 10,
            backgroundColor: '#fff',
          }}
        >
          {inputList.map((input) => {
            return (
              <Input
                key={input.name}
                type={input.type}
                label={input.label}
                variant={input.variant}
                name={input.name}
                fullWidth
                required
                onChange={changeHandler}
                error={inputs[input.name].error ? true : undefined}
                onBlur={blurHandler}
                value={inputs[input.name].value}
                sx={{ marginBottom: '20px' }}
                validationFn={input.validationFn}
                helperText={
                  inputs[input.name].error ? inputs[input.name].helperText : ''
                }
              />
            );
          })}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '10px 30px' }}
            btnName="Sign In"
          />
          {alert}
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <TextLink text="Forgot Password?" />
          </Box>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextLink text="Need a account? Sign Up" link="/signup" />
          </Box>
        </Box>
      </Form>
    </Container>
  );
};

export default LoginPage;
