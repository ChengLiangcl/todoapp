import { Box } from '@mui/material';

const Div = ({ id, className, children, ...props }) => (
  <Box id={id} className={className} {...props}>
    {children}
  </Box>
);

export default Div;
