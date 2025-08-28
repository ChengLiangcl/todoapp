import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
/**
 * Customized pagination component for MUI
 *
 * @param {number} count number of total pages
 * @returns {React.ReactElement} a React component
 *
 * A customized pagination component that renders a fixed position
 * pagination element with a background that blurs the background.
 *
 * The component accepts a single argument, `count`, which is the total
 * number of pages. The component renders a pagination element with the
 * given number of pages and a large rounded shape. The component also
 * defines a `handleChange` function that updates the state of the component
 * when the user clicks on a page.
 *
 * The component is styled to have a fixed position at the bottom of the
 * page with a z-index of 1200. The component also renders a backdrop filter
 * that blurs the background by 8px. The component is also styled to have
 * a padding of 6px on the left and right sides and 16px on the top and bottom
 * sides.
 */
export default function CustomizedPagination({
  count,
  currentPage,
  onPageChange,
}) {
  const [, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    typeof onPageChange === 'function' && onPageChange(value);
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
          count={count}
          page={currentPage}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Stack>
    </Paper>
  );
}
