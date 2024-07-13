import React from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { fetchTitles } from '../../../store/slices/titlesSlice';
import { Autocomplete, Link, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useTheme } from '@emotion/react';

export const HeaderSearch = () => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    dispatch(fetchTitles())
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        if (active) {
          setOptions([...originalPromiseResult]);
        }
      })
      .catch((rejectedValueOrSerializedError) => {
        console.error(rejectedValueOrSerializedError);
      });

    return () => {
      active = false;
    };
  }, [loading, dispatch]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Box sx={{ order: 2, padding: '0px 5px' }}>
      <Autocomplete
        onChange={(event, option) => {
          navigate(`/posts/${option?._id}`);
        }}
        id="asynchronous-search"
        blurOnSelect={true}
        clearOnBlur={true}
        clearOnEscape={true}
        size="small"
        sx={{ width: 250 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        renderOption={(props, option, { inputValue }) => {
          const { key, ...optionProps } = props;
          const matches = match(option.title, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.title, matches);

          return (
            <Link
              sx={{ color: 'inherit' }}
              key={key}
              underline="none"
              component={RouterLink}
              to={`/posts/${option._id}`}
              {...optionProps}
            >
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </Link>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            sx={{
              // Label
              '& .MuiFormLabel-root': {
                color: 'white',
              },
              // Focused label
              '& .MuiFormLabel-root.Mui-focused': {
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
              },
              // Hovered label
              '&:hover .MuiFormLabel-root ': {
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
              },
              // Input text
              '& .MuiInputBase-root': {
                color: 'white',

                '&:hover': {
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                },

                '&.Mui-focused': {
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,

                  '& .MuiAutocomplete-endAdornment button svg': {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                  },
                },

                '&:hover fieldset': {
                  borderWidth: '2px',
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                },

                '&:hover .MuiAutocomplete-endAdornment button svg': {
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                },

                '&.Mui-focused fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                },

                '& fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiAutocomplete-endAdornment button svg': {
                color: 'white',
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};
