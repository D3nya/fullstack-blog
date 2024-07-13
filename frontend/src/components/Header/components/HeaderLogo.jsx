import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';

// Assets
import BookIcon from '@mui/icons-material/Book';

export const HeaderLogo = ({ title }) => {
  const theme = useTheme();

  const activeColorLink =
    theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : theme.palette.secondary.light;

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex', order: 0 },
          alignItems: 'center',
        }}
      >
        <Box
          component={RouterNavLink}
          to="/"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'inherit',
            textDecoration: 'none',
          }}
          style={({ isActive }) => {
            return {
              color: isActive ? `${activeColorLink}` : '',
            };
          }}
        >
          <BookIcon sx={{ mr: '5px' }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: '10px',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.2rem',
              fontSize: '1.5rem',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none', order: 1 },
          alignItems: 'center',
        }}
      >
        <BookIcon sx={{ mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            mr: 2,
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '0.2rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {title}
        </Typography>
      </Box>
    </>
  );
};
