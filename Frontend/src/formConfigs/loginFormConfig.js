import { isRequired } from '../util/validaiton';
import { inputReducer } from '../util/helper';
const inputList = [
  {
    type: 'text',
    label: 'Username',
    name: 'username',
    validationFn: isRequired,
    variant: 'outlined',
    helperText: 'Please enter your username',
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    validationFn: isRequired,
    helperText: 'Password cannot be empty',
    variant: 'outlined',
  },
];
const inputObject = inputReducer(inputList);

export { inputList, inputObject };
