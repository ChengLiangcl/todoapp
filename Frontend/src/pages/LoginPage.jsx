import React from 'react';
import './LoginPage.module.css';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import { Box, Typography, Container } from '@mui/material';
import TextLink from '../components/TextLink/TextLink';
import Button from '../components/Button/Button';
import { inputList } from '../formConfigs/loginForm/loginFormConfig';
import Banner from '../components/Alert/Banner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setToken } from '../util/auth';
import Loader from '@components/Loader/Loader';
import { useLogin } from '../hooks/todos/login/useLogin';
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
    loginData,
    inputs,
    loginError,
    banner,
    loading,
    errors,
    loginSubmissionHandler,
    onBlurHandler,
    onChangeHandler,
  } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);
  useEffect(() => {
    if (loginData && !loginError) {
      setToken(loginData);
      navigate('/dashboard');
    }
  }, [loginData, loginError, navigate]);

  if (loading) {
    return <Loader>Verify your information please wait.....</Loader>;
  }

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        sx={{ color: '#333333', marginBottom: '30px' }}
      >
        Sign In
      </Typography>
      <Form method="POST" onSubmit={(e) => loginSubmissionHandler(e)}>
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
                onChange={onChangeHandler}
                error={errors[input.name] ? true : undefined}
                onBlur={onBlurHandler}
                value={inputs[input.name] ?? ''}
                sx={{ marginBottom: '20px' }}
                helperText={errors[input.name] ? input.helperText : ''}
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
          {banner.message && (
            <Banner
              visible={banner.visible}
              severity={banner.severity}
              message={banner.message}
              sx={{ mt: 2 }}
            />
          )}
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
