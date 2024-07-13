import React from 'react';
import { Button } from '@mui/material';

export const LoginButtons = ({ isValid }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{ mt: '30px' }}
      size="large"
      disabled={!isValid}
    >
      Sign in
    </Button>
  );
};
