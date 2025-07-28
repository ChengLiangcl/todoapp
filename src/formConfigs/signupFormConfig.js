import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import MailIcon from '@mui/icons-material/Mail';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  isRequired,
  isValidEmail,
  isStrongPassword,
  passwordsMatch,
} from '../util/validaiton';

import { inputReducer } from '../util/helper';

const inputList = [
  {
    type: 'text',
    label: 'Username',
    name: 'username',
    variant: 'outlined',
    Icon: AccountCircleIcon,
    validationFn: isRequired,
    helperText: 'Invalid username',
  },
  {
    type: 'email',
    label: 'Email',
    name: 'email',
    variant: 'outlined',
    Icon: MailIcon,
    validationFn: isValidEmail,
    helperText: 'Invalid email',
  },
  {
    type: 'password',
    label: 'Password',
    variant: 'outlined',
    name: 'password',
    Icon: LockResetIcon,
    validationFn: isStrongPassword,
    helperText: 'Invalid Password',
  },
  {
    type: 'password',
    label: 'Confirm Password',
    variant: 'outlined',
    name: 'confirmPassword',
    Icon: CheckCircleOutlineIcon,
    validationFn: passwordsMatch,
    helperText: 'Password is not match',
  },
];
const inputObject = inputReducer(inputList);

export { inputList, inputObject };
