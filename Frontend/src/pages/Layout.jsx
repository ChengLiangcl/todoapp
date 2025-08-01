import * as React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navigation
        pages={[
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Todo List', path: '/todo' },
          { name: 'Settings', path: '/settings' },
        ]}
        settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        navigationColor="primary"
        tooltipTitle="Open settings"
        logo={
          <Logo
            logoName={'Todo App'}
            to={'/dashboard'}
            icon={
              <EditNoteIcon
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              />
            }
          />
        }
      />
      <Outlet />
    </>
  );
}

export default Layout;
