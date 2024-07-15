import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from './components/Header/Header';
import { Posts } from './pages/Posts/Posts';
import { FullPost } from './pages/FullPost/FullPost';
import { AddPost } from './pages/AddPost/AddPost';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { NotFound } from './pages/NotFound/NotFound';
import { About } from './pages/About/About';
import { Profile } from './pages/Profile/Profile';
import { Home } from './pages/Home/Home';

import { fetchAuthMe } from './store/slices/authSlice';

// Font MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Footer } from './components/Footer/Footer';

// axios
// axios.defaults.baseURL = 'http://localhost:8000/';

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// React Router
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Header />
        <Container maxWidth="lg" sx={{ flexGrow: 1, mb: '10px' }}>
          <Outlet />
        </Container>
        <Footer sx={{ flexShrink: 0 }} />
      </Box>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'posts/:id',
        element: <FullPost />,
      },
      {
        path: 'posts/:id/edit',
        element: <AddPost />,
      },
      {
        path: 'posts/tag/:tag',
        element: <Posts />,
      },
      {
        path: 'posts/add',
        element: <AddPost />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
      {
        path: 'profile/:id/edit',
        element: <Registration />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

// MUI Theme
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  // MUI Theme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
