import React from 'react';
import Typography from '@mui/material/Typography';
import { Copyright } from './components/Copyright';
import { Paper } from '@mui/material';

export const Footer = () => {
  const title = 'D3 Blog';

  return (
    <Paper
      component="footer"
      sx={{ bgcolor: 'background.paper', py: 1, mt: 3 }}
    >
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Copyright />
    </Paper>
  );
};
