import { createTheme } from '@mui/material';

export const getTheme = (prefersDarkMode) => {
  return createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });
};
