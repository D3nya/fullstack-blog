import React from 'react';
import { Button } from '@mui/material';

export const RegistrationButtons = ({ isValid, isEdit }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      size="large"
      disabled={!isValid}
    >
      {isEdit ? 'Edit' : 'Sign up'}
    </Button>
  );
};
