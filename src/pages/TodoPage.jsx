// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   borderRadius: 3,
//   boxShadow: 24,
//   p: 4,
// };

// function DynamicModal({ steps, onClose }) {
//   const [stepIndex, setStepIndex] = React.useState(0);

//   const isLastStep = stepIndex === steps.length - 1;
//   const isFirstStep = stepIndex === 0;

//   const nextStep = () => {
//     if (!isLastStep) setStepIndex(stepIndex + 1);
//   };
//   const prevStep = () => {
//     if (!isFirstStep) setStepIndex(stepIndex - 1);
//   };

//   return (
//     <Box sx={style} width="100%">
//       <Stack spacing={3}>
//         {steps[stepIndex]}

//         <Stack direction="row" spacing={2} justifyContent="space-between">
//           {!isFirstStep && (
//             <Button variant="outlined" onClick={prevStep}>
//               Back
//             </Button>
//           )}
//           <Box sx={{ flexGrow: 1 }} />

//           {isLastStep ? (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => {
//                 alert('Form submitted!');
//                 onClose();
//               }}
//             >
//               Submit
//             </Button>
//           ) : (
//             <Button variant="contained" color="primary" onClick={nextStep}>
//               Next
//             </Button>
//           )}
//         </Stack>

//         <Button onClick={onClose} color="error" sx={{ mt: 2 }}>
//           Cancel
//         </Button>
//       </Stack>
//     </Box>
//   );
// }

// export default function TodoPage() {
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const steps = [
//     <Box key="step1">
//       <Typography variant="h4" component="h2" gutterBottom>
//         Step 1: Personal Info
//       </Typography>
//       <Typography>Please enter your name, email, and phone number.</Typography>
//       {/* Add form fields here later */}
//     </Box>,

//     // <Box key="step2">
//     //   <Typography variant="h4" component="h2" gutterBottom>
//     //     Step 2: Address
//     //   </Typography>
//     //   <Typography>
//     //     Enter your address details including city and postal code.
//     //   </Typography>
//     //   {/* Add form fields here later */}
//     // </Box>,

//     // <Box key="step3">
//     //   <Typography variant="h4" component="h2" gutterBottom>
//     //     Step 3: Review
//     //   </Typography>
//     //   <Typography>Review your entered details before submission.</Typography>
//     //   {/* Add review summary here later */}
//     // </Box>,
//   ];

//   return (
//     <div style={{ display: 'flex' }}>
//       <Button
//         variant="contained"
//         onClick={handleOpen}
//         sx={{ textTransform: 'none', marginLeft: 'auto', marginTop: '10px' }}
//       >
//         Add Todo Item
//       </Button>

//       <Modal open={open} onClose={handleClose}>
//         <DynamicModal steps={steps} onClose={handleClose} />
//       </Modal>
//     </div>
//   );
// }

import * as React from 'react';
import { Box, FormControl } from '@mui/material';

// function FilterBar() {
//   const [category, setCategory] = React.useState('');

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         alignItems: { xs: 'stretch', sm: 'center' },
//         justifyContent: 'space-between',
//         gap: 2,
//         p: 2,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 2,
//         boxShadow: 1,
//       }}
//     >
//       {/* Category Dropdown */}
//       <FormControl sx={{ minWidth: 150 }} size="small">
//         <InputLabel>Category</InputLabel>
//         <Select
//           value={category}
//           label="Category"
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <MenuItem value="all">All</MenuItem>
//           <MenuItem value="work">Work</MenuItem>
//           <MenuItem value="personal">Personal</MenuItem>
//           <MenuItem value="urgent">Urgent</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Keyword Search */}
//       <TextField
//         variant="outlined"
//         size="small"
//         placeholder="Search keyword..."
//         sx={{ flexGrow: 1 }}
//       />

//       {/* Filter Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ textTransform: 'none' }}
//       >
//         Apply Filter
//       </Button>
//     </Box>
//   );
// }

import ModalButton from '../components/ModalButton/ModalButton';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import CardView from '../components/CardView/CardView';
import Grid from '@mui/material/Grid';
import useForm from '../hooks/useForm';
import { inputReducer } from '../util/helper';
import { isRequired } from '../util/validaiton';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import MyDatePicker from '../components/DatePicker/DatePickers';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Uploader from '../components/Uploader/Uploader';
const TodoPage = () => {
  //   const [category, setCategory] = useState('');

  const todoInput = [
    {
      label: 'Todo Title',
      name: 'todoTitle',
      type: 'text',
      placeholder: 'Enter your todo title',
      helperText: 'Please enter your todo title',
      Icon: TitleIcon,
      validationFn: isRequired,
    },
    {
      label: 'Todo Description',
      name: 'todoDescription',
      type: 'textarea',
      placeholder: 'Enter your todo description',
      helperText: 'The description of your todo cannot be empty',
      validationFn: isRequired,
      Icon: DescriptionIcon,
    },
  ];

  const todoObject = inputReducer(todoInput);
  const { inputs, changeHandler, blurHandler, formSubmissionHandler } =
    useForm(todoObject);

  const todoForm = todoInput.map(
    ({ validationFn, placeholder, label, type, icon, Icon, name }, index) => {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '15px',
            width: '100%',
          }}
          key={index}
        >
          {Icon && (
            <Icon sx={{ minWidth: '40px', fontSize: '25px' }} color="primary" />
          )}
          <Input
            icon={icon}
            placeholder={placeholder}
            label={label}
            type={type}
            name={name}
            fullWidth
            validationFn={validationFn}
            helperText={inputs[name].error ? inputs[name].helperText : ''}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
        </Box>
      );
    }
  );

  return (
    <>
      <Form
        onSubmit={(e) =>
          formSubmissionHandler(e, 'http://localhost:3000/auth/register')
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            p: 2,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <FormControl sx={{ minWidth: 150 }} size="small">
            <Input
              options={['All', 'Work', 'Personal', 'Urgent']}
              type="select"
              label="Todo Category"
              id="categoryFilter"
            />
          </FormControl>
          <Input
            variant="outlined"
            size="small"
            placeholder="Search keyword..."
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none' }}
            btnName="Apply Filter"
          />
        </Box>
      </Form>
      <ModalButton
        buttonText="Add Todo Item"
        formId="todoForm"
        buttonStyle={{
          textTransform: 'none',
          marginTop: { xs: '10px' },
          marginRight: '10px',
        }}
        btnDivStyle={{ display: 'flex', justifyContent: 'flex-end' }}
        title="Add Todo Item"
      >
        {todoForm}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1, // spacing between icon and date picker
                marginBottom: '20px',
              }}
            >
              <DateRangeIcon
                sx={{ minWidth: '40px', fontSize: '25px' }}
                color="primary"
              />

              <MyDatePicker label="Start date" />
              <MyDatePicker label="Due date" />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Uploader
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Grid>
        </Grid>
      </ModalButton>
      <Grid
        container
        spacing={3} // controls gap between items
        sx={{ mt: 3 }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Box>
              <CardView />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TodoPage;
