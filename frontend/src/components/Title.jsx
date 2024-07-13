import React from 'react';
import { Typography } from '@mui/material';

export const Title = ({ children }) => {
  return (
    <Typography sx={{ mb: '30px', textAlign: 'center' }} variant="h4">
      {children}
    </Typography>
  );
};
