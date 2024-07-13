import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Rating,
  Button,
  Link,
  Skeleton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Assets
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { fetchAddComment } from '../../../store/slices/commentsSlice';

export const AddComment = ({ isLoading, id }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      text: '',
      rating: 5,
    },
    mode: 'onBlur',
  });

  async function onSubmit(comment) {
    try {
      const commentId = { ...comment, post: id };
      dispatch(fetchAddComment(commentId));

      reset();
    } catch (error) {
      console.error(error);
      alert(`Failed to create comment`);
    }
  }

  return (
    <>
      {!auth?.user && (
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            color: 'text.secondary',
          }}
        >
          {
            <Link component={RouterLink} to="/login">
              Authenticate to write a comment
            </Link>
          }
        </Typography>
      )}
      {auth?.user && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoading && (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                sx={{ margin: '5px' }}
              />
            )}
            {!isLoading && (
              <Avatar
                alt="Avatar"
                src={auth?.user?.avatarUrl}
                sx={{ margin: '5px' }}
              />
            )}
            <Box sx={{ flexGrow: 1, pr: '50px' }}>
              <TextField
                variant="outlined"
                error={Boolean(errors.text?.message)}
                helperText={errors.text?.message}
                {...register('text', {
                  required: 'Invalid text',
                  minLength: {
                    value: 3,
                    message: 'Text must be at least 3 characters',
                  },
                })}
                multiline
                rows={3}
                maxRows={6}
                fullWidth
                sx={{ margin: '5px' }}
              />
            </Box>
          </Box>
          <Box>
            <Box sx={{ marginLeft: '50px' }}>
              <Typography component="legend" color="text.secondary">
                Rate
              </Typography>
              <Controller
                control={control}
                name="rating"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Rating
                    onChange={onChange}
                    onBlur={onBlur}
                    value={Number(value)}
                    ref={ref}
                  />
                )}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              size="medium"
              endIcon={<SendIcon />}
              sx={{ marginLeft: '50px', marginBottom: '20px' }}
              disabled={!isValid}
            >
              Send
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
