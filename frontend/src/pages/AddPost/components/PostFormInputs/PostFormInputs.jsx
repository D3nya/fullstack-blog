import React from 'react';
import { TextField } from '@mui/material';

// Styles
import styles from './PostFormInputs.module.scss';

export const PostFormInputs = ({ register, errors }) => {
  return (
    <>
      <TextField
        variant="standard"
        placeholder="Title..."
        fullWidth
        size="medium"
        sx={{ mb: '15px', mt: '5px' }}
        error={Boolean(errors.title?.message)}
        helperText={errors.title?.message}
        className={styles.title}
        {...register('title', {
          required: 'Invalid title',
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters',
          },
        })}
      />
      <TextField
        variant="standard"
        placeholder="Tags"
        fullWidth
        size="medium"
        sx={{ mb: '30px' }}
        {...register('tags')}
      />
    </>
  );
};
