import React from 'react';
import { Box, Button, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Assets
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useController } from 'react-hook-form';

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

export const PostFormImage = ({ getValues, resetField, control }) => {
  const [isImgLoading, setIsImgLoading] = React.useState(false);

  const { field } = useController({ name: 'imageUrl', control });

  const onClickRemoveImage = () => {
    if (window.confirm('Are you sure you want to delete image?')) {
      resetField('imageUrl');
    }
  };

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
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleChangeFile}
        >
          Upload image
          <VisuallyHiddenInput
            type="file"
            onChange={handleChangeFile}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
          />
        </Button>
        {getValues('imageUrl') && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Delete
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ mt: '15px' }}>
        {getValues('imageUrl') && (
          <Box
            component="img"
            src={getValues('imageUrl')}
            alt="Post Image"
            sx={{
              width: '100%',
              maxHeight: '500px',
              borderRadius: '4px',
            }}
          ></Box>
        )}
        {isImgLoading && (
          <Skeleton
            sx={{ height: '500px', width: '100%', borderRadius: '4px' }}
            animation="wave"
            variant="circular"
          />
        )}
      </Box>
    </>
  );
};
