import React from 'react';
import { Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const PostFormButtons = ({ isEditing, isValid }) => {
  return (
    <Box sx={{ display: 'flex', gap: '8px', mt: '15px' }}>
      <Button
        variant="contained"
        disabled={!isValid}
        size="medium"
        type="submit"
        color="success"
      >
        {isEditing ? 'Save' : 'Publish'}
      </Button>
      <Button component={RouterLink} to={-1} variant="text" color="error">
        Cancel
      </Button>
    </Box>
  );
};
