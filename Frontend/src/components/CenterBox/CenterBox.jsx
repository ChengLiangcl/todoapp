import React from 'react';
import { Box } from '@mui/material';

const CenteredBox = ({ className, children, ...props }) => (
  <Box
    display="flex"
    alignItems="center"
    className={className}
    justifyContent="center"
    {...props}
  >
    {children}
  </Box>
);

export default CenteredBox;
