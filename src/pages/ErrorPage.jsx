import React from 'react';
import Box from '@mui/material/Box';
const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      Page not found!
    </Box>
  );
};

export default ErrorPage;
