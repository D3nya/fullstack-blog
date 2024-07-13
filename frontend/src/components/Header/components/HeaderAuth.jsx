import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Avatar,
} from '@mui/material';
import { useSelector } from 'react-redux';

export const HeaderAuth = ({ onClickLogout }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { auth } = useSelector((state) => state);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, order: 5 }}>
      {auth?.user ? (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={auth.user?.avatarUrl} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {
              <>
                <MenuItem
                  component={RouterLink}
                  to={`/profile/${auth?.user?._id}`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{'Profile'}</Typography>
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to={`/profile/${auth?.user?._id}/edit`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{'Account'}</Typography>
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to={'/posts/add'}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{'Create post'}</Typography>
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to={'/'}
                  onClick={() => {
                    handleCloseUserMenu();
                    onClickLogout();
                  }}
                >
                  <Typography textAlign="center">{'Logout'}</Typography>
                </MenuItem>
              </>
            }
          </Menu>
        </>
      ) : (
        <>
          <Button
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
          <Button
            color="inherit"
            variant="text"
            component={RouterLink}
            to="/registration"
          >
            Register
          </Button>
        </>
      )}
    </Box>
  );
};
