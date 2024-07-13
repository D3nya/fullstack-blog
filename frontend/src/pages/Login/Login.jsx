import { Paper, Box } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Components
import { Title } from '../../components/Title';
import { LoginInputs } from './components/LoginInputs';
import { LoginButtons } from './components/LoginButtons';

// Redux
import { fetchAuth, isAuthSelector } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      loginOrEmail: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const isAuth = useSelector(isAuthSelector);

  if (isAuth) {
    return navigate('/');
  }

  const onSubmit = async (values) => {
    let user = {
      password: values.password,
    };

    if (values.loginOrEmail.includes('@')) {
      user = {
        ...user,
        email: values.loginOrEmail,
      };
    } else {
      user = {
        ...user,
        login: values.loginOrEmail,
      };
    }

    const data = await dispatch(fetchAuth(user));

    if (!data.payload) {
      return alert('Failed to login');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
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
      <Title>Login</Title>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <LoginInputs register={register} errors={errors} />
        <LoginButtons isValid={isValid} />
      </Box>
    </Paper>
  );
};
