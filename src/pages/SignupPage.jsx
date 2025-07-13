import React from 'react';
import './LoginPage.module.css';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import { Box, Typography, Container } from '@mui/material';
import Button from '../components/Button/Button';
import CustomIconButton from '../components/IconButton/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useForm from '../hooks/useForm';
import { inputList, inputObject } from '../formConfigs/signupFormConfig';
const SignupPage = () => {
  const { changeHandler, inputs, blurHandler, validateAll } =
    useForm(inputObject);

  const buttonDisabled = validateAll() ? false : true;
  return (
    <>
      <CustomIconButton
        icon={ArrowBackIcon}
        iconProps={{ color: 'primary', sx: { fontSize: '32px' } }}
        buttonProps={{
          sx: {
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: '#fff',
            boxShadow: 1,
            borderRadius: '50%',
          },
        }}
        to="/"
      />
      <Container sx={{ maxWidth: 800, width: 600, justifyContent: 'center' }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: '#333333', marginBottom: '10px' }}
        >
          Create an account
        </Typography>
        <Form id="signup">
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
            {inputList.map(({ Icon, ...item }) => (
              <React.Fragment key={item.name}>
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    gap: '15px',
                    width: '100%',
                  }}
                >
                  {Icon && (
                    <Icon
                      sx={{ minWidth: '40px', fontSize: '25px' }}
                      color="primary"
                    />
                  )}
                  <Input
                    key={item.label}
                    {...item}
                    name={item.name}
                    fullWidth
                    // error={false}
                    error={inputs[item.name].error ? true : undefined}
                    helperText={
                      inputs[item.name].error
                        ? inputs[item.name].helperText
                        : ''
                    }
                    sx={{ flexGrow: 1, minWidth: 0 }}
                    validationFn={item.validationFn}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                  />
                </Box>
              </React.Fragment>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                btnName="Create"
                disabled={buttonDisabled}
                sx={{ marginTop: '20px', padding: '14px 30px' }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Form>
      </Container>
    </>
  );
};

export default SignupPage;
