import { Typography } from '@mui/material';
import { Box } from '@mui/material';
const ErrorText = ({ errorMessage }) => (
  <Box sx={{ mt: -2, mb: 2 }}>
    <Typography
      color="error"
      variant="body2"
      sx={{
        marginLeft: '55px',
        display: 'flex',
        justifyContent: 'start',
      }}
    >
      {errorMessage}
    </Typography>
  </Box>
);

export default ErrorText;
