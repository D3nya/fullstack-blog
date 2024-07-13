import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link component={RouterLink} color="inherit" to="/">
        D3 Blog
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};
