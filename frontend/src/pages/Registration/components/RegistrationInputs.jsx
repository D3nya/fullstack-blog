import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';

// Assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const RegistrationInputs = ({ register, errors, isEdit }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = React.useState('male');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <TextField
        InputLabelProps={{ shrink: true }}
        required
        label="First name"
        fullWidth
        sx={{ mb: '20px' }}
        error={Boolean(errors.firstName?.message)}
        helperText={errors.firstName?.message}
        {...register('firstName', {
          required: 'Invalid first name',
          minLength: {
            value: 3,
            message: 'First name must be at least 3 characters',
          },
        })}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        required
        label="Last name"
        fullWidth
        sx={{ mb: '20px' }}
        error={Boolean(errors.lastName?.message)}
        helperText={errors.lastName?.message}
        {...register('lastName', {
          required: 'Invalid last name',
          minLength: {
            value: 3,
            message: 'Last name must be at least 3 characters',
          },
        })}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        type="email"
        required
        label="E-Mail"
        fullWidth
        sx={{ mb: '20px' }}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {
          required: 'Invalid e-mail',
        })}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        required
        label="Login"
        fullWidth
        sx={{ mb: '20px' }}
        error={Boolean(errors.login?.message)}
        helperText={errors.login?.message}
        {...register('login', {
          required: 'Invalid login',
          minLength: {
            value: 3,
            message: 'Login must be at least 3 characters',
          },
        })}
      />
      {!isEdit && (
        <FormControl
          sx={{ mb: '20px' }}
          variant="outlined"
          fullWidth
          error={Boolean(errors.password?.message)}
        >
          <InputLabel required htmlFor="password" shrink>
            Password
          </InputLabel>
          <OutlinedInput
            {...register('password', {
              required: 'Enter your password',
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters',
              },
            })}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            notched
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
      )}
      <FormControl sx={{ mb: '20px' }}>
        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            {...register('gender')}
            value="male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            {...register('gender')}
            value="female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            {...register('gender')}
            value="other"
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
