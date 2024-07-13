import { Paper } from '@mui/material';
import React from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { PostFormImage } from './components/PostFormImage';
import { PostFormInputs } from './components/PostFormInputs/PostFormInputs';
import { PostFormMarkdown } from './components/PostFormMarkdown/PostFormMarkdown';
import { PostFormButtons } from './components/PostFormButtons';

// Redux
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../store/slices/authSlice';
import { useForm } from 'react-hook-form';

export const AddPost = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      tags: '',
      text: '',
      imageUrl: '',
    },
    mode: 'onBlur',
  });

  const { id } = useParams();
  const { auth } = useSelector((state) => state);

  const navigate = useNavigate();

  const isAuth = useSelector(isAuthSelector);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          console.log(data, auth);
          if (auth?.user?._id !== data?.user?._id) {
            return navigate('/');
          }
          const tags = data.tags.map((tag) => `#${tag.title}`);
          setValue('imageUrl', data.imageUrl);
          setValue('title', data.title);
          setValue('tags', tags.join(', '));
          setValue('text', data.text);
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to edit post');
        });
    }
  }, [id, setValue, getValues, auth, navigate]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return navigate('/');
  }

  const isEditing = Boolean(id);

  const onSubmit = async (post) => {
    try {
      const { data } = isEditing
        ? await axios.put(`/posts/${id}`, post)
        : await axios.post('/posts', post);
      const postId = data._id;

      return navigate(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
      alert(`Failed to ${isEditing ? 'save' : 'create'} post`);
    }
  };

  return (
    <Paper sx={{ mt: '15px', mb: '15px', padding: '15px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <PostFormImage
          getValues={getValues}
          resetField={resetField}
          control={control}
        />
        <PostFormInputs register={register} errors={errors} />
        <PostFormMarkdown
          register={register}
          errors={errors}
          control={control}
        />
        <PostFormButtons isEditing={isEditing} isValid={isValid} />
      </Box>
    </Paper>
  );
};
