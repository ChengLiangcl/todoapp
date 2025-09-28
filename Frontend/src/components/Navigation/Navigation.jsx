import React from 'react';
import AppBar from '@mui/material/AppBar';
import NavItem from '../NavItem/NavItem';
import Toolbar from '@mui/material/Toolbar';
import UserAvatar from '../UserAvatar/UserAvatar';
import Box from '@mui/material/Box';
import Logo from '../Logo/Logo';
function Navigation({ pages, settings, navigationColor, tooltipTitle, logo }) {
  const setting = [
    {
      key: 'Profile',
      label: 'Profile',
      modalProps: {
        buttonText: 'Open Profile',
        title: 'Profile Settings',
        children: <div>Your profile form or content here</div>,
        modalWidth: '40%',
        modalHeight: '60%',
      },
    },
    {
      key: 'Account',
      label: 'Account',
      modalProps: {
        buttonText: 'Open Account',
        title: 'Account Settings',
        children: <div>Your account form or content here</div>,
        modalWidth: '40%',
        modalHeight: '60%',
      },
    },
    {
      key: 'Logout',
      label: 'Logout',
      action: () => {
        alert('Logging out...');
        // your logout logic here
      },
    },
  ];
  return (
    <AppBar position="static" color={navigationColor}>
      <Toolbar sx={{ px: 2 }}>
        <NavItem pages={pages} settings={settings} logo={logo} />
        <Box sx={{ flexGrow: 1 }} />
        <UserAvatar settings={setting} tooltipTitle={tooltipTitle} />
      </Toolbar>
    </AppBar>
  );
}
export default Navigation;
