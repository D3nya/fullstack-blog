import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';

// Assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LoginInputs = ({ register, errors, isValid }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        label="Login or e-mail"
        variant="outlined"
        error={Boolean(errors.loginOrEmail?.message)}
        helperText={errors.loginOrEmail?.message}
        fullWidth
        {...register('loginOrEmail', { required: 'Invalid login or e-mail' })}
      />
      <FormControl
        sx={{ mt: '10px' }}
        variant="outlined"
        error={Boolean(errors.password?.message)}
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          {...register('password', { required: 'Enter your password' })}
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>
    </>
  );
};
