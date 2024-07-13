import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

import { HeaderLogo } from './components/HeaderLogo';
import { HeaderMenu } from './components/HeaderMenu';
import { HeaderAuth } from './components/HeaderAuth';
import { HeaderTheme } from './components/HeaderTheme';
import { HeaderSearch } from './components/HeaderSearch';

export const Header = () => {
  const pages = [
    { page: 'Posts', path: '/posts' },
    { page: 'About', path: '/about' },
  ];
  const title = 'D3 BLOG';

  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <HeaderLogo title={title} />
          <HeaderMenu pages={pages} />
          <HeaderTheme />
          <HeaderSearch />
          <HeaderAuth onClickLogout={onClickLogout} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
