import React from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Skeleton,
  Tooltip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeletePost } from '../../store/slices/postsSlice';

// Assets
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addFavourite, deleteFavourite } from '../../store/slices/authSlice';
import { Snack } from '../Snack/Snack';

export const PostActions = ({ _id, isEditable, isLoading, isAuth }) => {
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = React.useState({
    opened: false,
    message: '',
  });

  const { auth } = useSelector((state) => state);

  const handleDeletePost = () => {
    try {
      if (window.confirm('Are you sure you want to delete post?')) {
        dispatch(fetchDeletePost(_id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isFavouritePost = auth?.user?.favourites?.some((item) => {
    return item._id === _id;
  });

  const handleAddToFavoritePost = () => {
    try {
      if (isFavouritePost) {
        dispatch(deleteFavourite({ id: _id }));

        setSnackbar({ opened: true, message: 'Post deleted from favourites' });
      } else {
        dispatch(addFavourite({ id: _id }));

        setSnackbar({ opened: true, message: 'Post added to favourites' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isUserLoading = auth.status === 'loading';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const url = `${window.location.origin}/posts/${_id}`;
        await navigator.share({
          title: 'Check out this post!',
          text: 'Here is an interesting post I found.',
          url: url,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      alert('Web Share API not working in this browser.');
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton variant="text" animation="wave" width="25%" />
      ) : (
        <Box>
          {isAuth && (
            <Tooltip title="Favorites">
              <IconButton
                aria-label="add to favorites"
                onClick={handleAddToFavoritePost}
              >
                {isUserLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <FavoriteIcon color={isFavouritePost ? 'primary' : ''} />
                )}
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Share">
            <IconButton aria-label="share" onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          {isEditable && (
            <>
              <Link component={RouterLink} to={`/posts/${_id}/edit`}>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Delete">
                <IconButton
                  component={RouterLink}
                  to={`/posts`}
                  aria-label="delete"
                  onClick={handleDeletePost}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Snack
            isOpen={snackbar.opened}
            handleClose={() => setSnackbar({ ...snackbar, opened: false })}
            msg={snackbar.message}
          />
        </Box>
      )}
    </>
  );
};
