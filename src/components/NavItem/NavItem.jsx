import React from 'react';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const NavItem = ({ pages, logo }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const DesktopNav = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {pages.map(({ name, path }) => (
        <Button
          key={path}
          component={NavLink}
          to={path}
          onClick={handleCloseNavMenu}
          style={({ isActive }) => ({
            my: 2,
            color: isActive ? 'yellow' : 'white',
            fontWeight: isActive ? 'bold' : 'normal',
            textTransform: 'none',
          })}
        >
          {name}
        </Button>
      ))}
    </Box>
  );

  const MobileNav = () => (
    <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
      <IconButton
        size="large"
        aria-label="menu"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map(({ name, path }) => (
          <MenuItem
            key={path}
            component={NavLink}
            to={path}
            onClick={handleCloseNavMenu}
          >
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {logo}
      <DesktopNav />
      <MobileNav />
    </Box>
  );
};

export default NavItem;
