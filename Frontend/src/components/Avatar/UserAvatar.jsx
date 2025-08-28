import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ModalButton from '../ModalButton/ModalButton'; // Import your ModalButton

const UserAvatar = ({ settings, tooltipTitle }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={tooltipTitle}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ key, label, modalProps, action }) => {
          if (modalProps) {
            // MenuItem containing your ModalButton component
            return (
              <MenuItem key={key} onClick={handleCloseUserMenu}>
                <ModalButton
                  {...modalProps}
                  buttonText={label}
                  btnDivStyle={{ width: '100%' }}
                />
              </MenuItem>
            );
          } else if (action) {
            // Normal menu item triggers action directly
            return (
              <MenuItem
                key={key}
                onClick={() => {
                  action();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">{label}</Typography>
              </MenuItem>
            );
          }
          // Fallback: just show label text
          return (
            <MenuItem key={key} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{label}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default UserAvatar;
