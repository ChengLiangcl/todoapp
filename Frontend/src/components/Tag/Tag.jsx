import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tag({ tagName, color, sx }) {
  return (
    <Stack spacing={1} sx={{ ...sx, mt: 1, mb: 1 }}>
      <Stack direction="row" spacing={1}>
        <Chip label={tagName} color={color} />
      </Stack>
    </Stack>
  );
}
