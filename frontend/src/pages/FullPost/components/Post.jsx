import React from 'react';
import { Box, Skeleton, Avatar, Typography, Link } from '@mui/material';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

import { PostData } from '../../../components/PostData/PostData';

export const Post = ({ post, isLoading, isEditable }) => {
  return (
    <>
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="rounded"
          width="100%"
          height={400}
        />
      ) : (
        <>
          {post.imageUrl ? (
            <Box
              component="img"
              src={post.imageUrl}
              alt={post.title}
              sx={{ width: '100%', borderRadius: '4px', padding: '10px' }}
            ></Box>
          ) : null}
        </>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        ) : (
          <Avatar aria-label="avatar" src={post.user?.avatarUrl}></Avatar>
        )}
        <Box sx={{ ml: '15px' }}>
          {isLoading ? (
            <Skeleton variant="text" animation="wave" height={15} width={80} />
          ) : (
            <Link
              component={RouterLink}
              to={`/profile/${post.user?._id}`}
              underline="none"
            >
              {post.user?.firstName + ' ' + post.user?.lastName}
            </Link>
          )}
          {isLoading ? (
            <Skeleton variant="text" animation="wave" height={15} width={150} />
          ) : (
            <Typography component="div" variant="body2" color="text.secondary">
              {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ padding: '10px' }}>
        {isLoading ? (
          <PostData isEditable={isEditable} isFullPost isLoading={isLoading} />
        ) : (
          <PostData
            _id={post._id}
            title={post.title}
            tags={post.tags}
            commentsCount={post.totalComments}
            rating={post.avgRating}
            viewsCount={post.viewsCount}
            text={post.text}
            isEditable={isEditable}
            isFullPost
            isLoading={isLoading}
          />
        )}
      </Box>
    </>
  );
};
