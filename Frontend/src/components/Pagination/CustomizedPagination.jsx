import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function CustomizedPagination(count = 100) {
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '6px 16px',
        zIndex: 1200,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Pagination
          count={100}
          page={page}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Stack>
    </Paper>
  );
}
