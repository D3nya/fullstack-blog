import { Paper, Typography } from '@mui/material';
import React from 'react';

export const SideBlock = ({ title, children, sx }) => {
  return (
    <Paper elevation={1} sx={{ padding: '10px', ...sx }}>
      <Typography component="h5" variant="h5">
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
