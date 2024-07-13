import React from 'react';
import { Avatar, Box, Button, Skeleton, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useController } from 'react-hook-form';
import axios from 'axios';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useTheme } from '@emotion/react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const RegistrationAvatar = ({ control, getValues }) => {
  const [isImgLoading, setIsImgLoading] = React.useState(false);

  const theme = useTheme();

  const { field } = useController({ name: 'avatarUrl', control });

  const handleChangeFile = async (event) => {
    try {
      setIsImgLoading(true);
      const formData = new FormData();
      const file = event.target.files[0];

      formData.append('image', file);
      const { data } = await axios.post('/uploads', formData);
      field.onChange(`/uploads/${data.filename}`);
    } catch (error) {
      console.error(error);
      alert('Error uploading file');
    } finally {
      setIsImgLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{ margin: '30px auto', display: 'flex', justifyContent: 'center' }}
      >
        <Button
          component="label"
          tabIndex={-1}
          role={undefined}
          onChange={handleChangeFile}
        >
          {isImgLoading && (
            <Skeleton
              sx={{ height: 100, width: 100 }}
              animation="wave"
              variant="circular"
            />
          )}
          {!isImgLoading && (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <PhotoCameraIcon
                  sx={{
                    color: theme.palette.primary.light,
                    border: `5px solid ${theme.palette.primary.light}`,
                    backgroundColor: theme.palette.secondary.dark,
                    borderRadius: '50%',
                    padding: '.2rem',
                    width: 35,
                    height: 35,
                  }}
                />
              }
            >
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="Avatar"
                src={getValues('avatarUrl')}
              />
            </Badge>
          )}
          <VisuallyHiddenInput
            type="file"
            onChange={handleChangeFile}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
          />
        </Button>
      </Box>
    </>
  );
};
