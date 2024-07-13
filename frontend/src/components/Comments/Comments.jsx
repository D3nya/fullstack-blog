import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  Skeleton,
  Rating,
  Link,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../store/slices/commentsSlice';

export const Comments = ({ isFullPost, postId }) => {
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state);
  const isCommentsLoading = comments.status === 'loading';

  const theme = useTheme();

  useEffect(() => {
    if (isFullPost) {
      dispatch(fetchComments({ sortBy: 'all', postId }));
    } else {
      dispatch(fetchComments({ sortBy: 'new' }));
    }
  }, [dispatch, isFullPost, postId]);

  return (
    <List>
      {isCommentsLoading &&
        [...Array(3)].map((item, index) => (
          <Box key={index}>
            <ListItem
              alignItems="flex-start"
              sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, pb: '0px' }}
            >
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              {isFullPost ? (
                <ListItemText>
                  <Skeleton width={150} variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton width={70} variant="text" animation="wave" />
                </ListItemText>
              ) : (
                <ListItemText
                  primary={
                    <Skeleton width={70} variant="text" animation="wave" />
                  }
                  secondary={
                    <Skeleton width={240} variant="text" animation="wave" />
                  }
                />
              )}
            </ListItem>
            <Divider width="90%" />
          </Box>
        ))}
      {!isCommentsLoading &&
        (isFullPost ? comments.items : comments.items.slice(0, 3)).map(
          (comment, index) => (
            <Box key={index}>
              <ListItem
                alignItems="center"
                sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, pb: '0px' }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
                    src={comment?.user?.avatarUrl}
                  />
                </ListItemAvatar>
                {isFullPost ? (
                  <ListItemText>
                    <Link
                      color={`${theme.palette.text.primary}`}
                      component={RouterLink}
                      to={`/profile/${comment.user?._id}`}
                      underline="none"
                    >
                      {`${comment.user?.firstName} ${comment.user?.lastName}`}
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {comment.text}
                    </Typography>
                    <Rating
                      name="read-only-rating"
                      aria-label="rating"
                      value={comment.rating}
                      precision={0.5}
                      readOnly
                      sx={{ mt: '5px' }}
                    />
                  </ListItemText>
                ) : (
                  <ListItemText
                    primary={
                      <>
                        <Link
                          component={RouterLink}
                          underline="none"
                          to={`/posts/${comment.post?._id}`}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {`${comment.post?.title}`}
                        </Link>
                        <Box>
                          <Link
                            color={`${theme.palette.text.primary}`}
                            component={RouterLink}
                            to={`/profile/${comment.user?._id}`}
                            underline="none"
                          >
                            {`${comment.user?.firstName} ${comment.user?.lastName}`}
                          </Link>
                        </Box>
                      </>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {comment.text.slice(0, 60) + '...'}
                        </Typography>
                      </>
                    }
                  ></ListItemText>
                )}
              </ListItem>
              <Divider width="90%" />
            </Box>
          )
        )}
      {!isCommentsLoading && comments.items.length === 0 && (
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: '25px' }}
        >
          No comments
        </Typography>
      )}
    </List>
  );
};
