import React from 'react';
import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';

const Logo = ({ logoName, url, variant = 'h6', sx = {}, icon = {} }) => {
  return (
    <>
      {icon}
      <Typography variant={variant} noWrap component="a" to={url} sx={sx}>
        {logoName}
      </Typography>
    </>
  );
};
export default Logo;
