import React from 'react';
import { Paper, Typography } from '@mui/material';

export const About = () => {
  return (
    <Paper sx={{ mt: '15px' }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: 'center', pt: '5px' }}
      >
        About
      </Typography>
      <Typography sx={{ p: '10px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </Paper>
  );
};
