import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';

// Assets
import MenuIcon from '@mui/icons-material/Menu';

export const HeaderMenu = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const theme = useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const activeColorLink =
    theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : theme.palette.secondary.light;

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', order: 1 } }}>
        {pages.map(({ page, path }, index) => (
          <Button
            key={index}
            onClick={handleCloseNavMenu}
            component={RouterNavLink}
            to={path}
            sx={{ my: 2, color: 'white', display: 'block' }}
            style={({ isActive }) => {
              return {
                color: isActive ? `${activeColorLink}` : '',
              };
            }}
          >
            {page}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none', order: 0 } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map(({ page, path }, index) => (
            <MenuItem
              key={index}
              onClick={handleCloseNavMenu}
              component={RouterLink}
              to={path}
            >
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};
