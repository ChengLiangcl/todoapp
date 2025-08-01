import React from 'react';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const TextLink = ({ link, text }) => {
  return (
    <Link component={RouterLink} to={link} underline="hover">
      {text}
    </Link>
  );
};

export default TextLink;
