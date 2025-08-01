import React from 'react';
import AppBar from '@mui/material/AppBar';
import NavItem from '../NavItem/NavItem';
import Toolbar from '@mui/material/Toolbar';
import UserAvatar from '../Avatar/UserAvatar';
import Box from '@mui/material/Box';
import Logo from '../Logo/Logo';
function Navigation({ pages, settings, navigationColor, tooltipTitle, logo }) {
  return (
    <AppBar position="static" color={navigationColor}>
      <Toolbar sx={{ px: 2 }}>
        <NavItem pages={pages} settings={settings} logo={logo} />
        <Box sx={{ flexGrow: 1 }} />
        <UserAvatar settings={settings} tooltipTitle={tooltipTitle} />
      </Toolbar>
    </AppBar>
  );
}
export default Navigation;
