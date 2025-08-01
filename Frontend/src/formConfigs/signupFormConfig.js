import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import MailIcon from '@mui/icons-material/Mail';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CustomIconButton from '../components/IconButton/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import Input from '../components/Input/Input';
import React from 'react';
import ErrorText from '../components/ErrorText/ErrorText';
import {
  isRequired,
  isValidEmail,
  isStrongPassword,
  passwordsMatch,
} from '../util/validaiton';
import Banner from '../components/Alert/Banner';
import Button from '../components/Button/Button';

import { inputReducer } from '../util/helper';
import { display } from '@mui/system';

const inputList = [
  {
    type: 'text',
    label: 'Username',
    name: 'username',
    variant: 'outlined',
    Icon: AccountCircleIcon,
    validationFn: isRequired,
    errorMessage: 'Username cannot be empty',
  },
  {
    type: 'email',
    label: 'Email',
    name: 'email',
    variant: 'outlined',
    Icon: MailIcon,
    validationFn: isValidEmail,
    errorMessage: 'Email is not valid',
  },
  {
    type: 'password',
    label: 'Password',
    variant: 'outlined',
    name: 'password',
    Icon: LockResetIcon,
    validationFn: isStrongPassword,
    errorMessage: 'Password is not strong enough',
  },
  {
    type: 'password',
    label: 'Confirm Password',
    variant: 'outlined',
    name: 'confirmPassword',
    Icon: CheckCircleOutlineIcon,
    validationFn: passwordsMatch,
    errorMessage: 'The passwords do not match',
  },
];
const initial = inputReducer(inputList);

const BackDropButton = () => {
  return (
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
  );
};

const SignupHeading = () => {
  return (
    <Typography
      variant="h4"
      align="center"
      sx={{ color: '#333333', marginBottom: '15px' }}
    >
      Create an account
    </Typography>
  );
};

const SignupPageInput = ({ inputs, errors, changeHandler, onBlurHandler }) => {
  return inputList.map(({ Icon, ...item }) => (
    <React.Fragment key={item.name}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '15px',
          width: '100%',
        }}
      >
        {Icon && (
          <Icon sx={{ minWidth: '40px', fontSize: '25px' }} color="primary" />
        )}
        <Input
          {...item}
          name={item.name}
          fullWidth
          value={inputs[item.name].value}
          error={errors[item.name] ?? false}
          sx={{ flexGrow: 1, minWidth: 0 }}
          validationFn={item.validationFn}
          onChange={changeHandler}
          onBlur={onBlurHandler}
        />
      </Box>
      {errors[item.name] && (
        <ErrorText errorMessage={item.errorMessage || 'Invalid input'} />
      )}
    </React.Fragment>
  ));
};

const Alert = ({ bannerType, bannerVisible, alertMessage }) => {
  return (
    <Banner
      sx={{ marginTop: '20px' }}
      severity={bannerType}
      visible={bannerVisible}
      message={alertMessage}
    />
  );
};

const SignupButton = ({ buttonDisabled }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        btnName="Create"
        disabled={buttonDisabled}
        sx={{
          marginTop: '20px',
          padding: '14px 30px',
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
};
const testData = () => {};
export {
  inputList,
  initial,
  BackDropButton,
  SignupHeading,
  SignupPageInput,
  Alert,
  SignupButton,
};
