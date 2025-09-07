import { isRequired, validateDateComparison } from '../../../util/validaiton';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
const todoFormFields = [
  {
    label: 'Todo Title',
    name: 'title',
    type: 'text',
    placeholder: 'Enter your todo title',
    helperText: 'Please enter your todo title',
    Icon: TitleIcon,
    validationFn: isRequired,
  },
  {
    label: 'Todo Description',
    name: 'content',
    type: 'textarea',
    placeholder: 'Enter your todo description',
    helperText: 'The description of your todo cannot be empty',
    Icon: DescriptionIcon,
    validationFn: isRequired,
  },
];

const datePickerInput = [
  {
    label: 'Start date',
    name: 'startDate',
    type: 'date',
    placeholder: 'Choose the todo start date',
    helperText: 'Start date must be before the due date',
    Icon: DateRangeIcon,
    validationFn: (value, inputs) =>
      validateDateComparison(value, inputs, 'dueDate'),
  },
  {
    label: 'End date',
    name: 'dueDate',
    type: 'date',
    placeholder: 'Choose the todo end date',
    Icon: DateRangeIcon,
    validationFn: (value, inputs) =>
      validateDateComparison(inputs['startDate']?.value, inputs, 'dueDate'),
  },
];
export { todoFormFields, datePickerInput };
