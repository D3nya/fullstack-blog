import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { Title } from '../../components/Title';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEditUser,
  fetchRegister,
  isAuthSelector,
} from '../../store/slices/authSlice';

// Components
import { RegistrationAvatar } from './components/RegistrationAvatar';
import { RegistrationButtons } from './components/RegistrationButtons';
import { RegistrationInputs } from './components/RegistrationInputs';

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const isAuth = useSelector(isAuthSelector);

  const { user, status } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      login: '',
      password: '',
      gender: '',
      avatarUrl: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(user);
  }, [user, status, reset]);

  if (isAuth && !id && status !== 'loading') {
    return navigate(`/profile/${user._id}/edit`);
  }

  if (!isAuth && id && status !== 'loading') {
    return navigate('/registration');
  }

  const onSubmit = async (values) => {
    try {
      const { password, ...valuesWithoutPassword } = values;

      const { data } = isEdit
        ? dispatch(
            fetchEditUser({
              params: valuesWithoutPassword,
              userId: user._id,
            })
          )
        : dispatch(fetchRegister(values));

      if (!data.payload) {
        return alert(`Failed to ${isEdit ? 'edit' : 'register'}`);
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      sx={{
        padding: '25px',
        margin: '25px auto',
        width: '40%',
      }}
    >
      <Title>{isEdit ? 'Editing' : 'Registration'}</Title>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <RegistrationAvatar control={control} getValues={getValues} />
        <RegistrationInputs
          register={register}
          errors={errors}
          isEdit={isEdit}
        />
        <RegistrationButtons isValid={isValid} isEdit={isEdit} />
      </Box>
    </Paper>
  );
};
