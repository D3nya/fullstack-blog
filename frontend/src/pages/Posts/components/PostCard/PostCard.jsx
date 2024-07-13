import React from 'react';
import { Card } from '@mui/material';

import { PostCardHeader } from './components/PostCardHeader';
import { PostCardBody } from './components/PostCardBody';
import { PostCardFooter } from './components/PostCardFooter';

export const PostCard = ({
  _id,
  title,
  text,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  rating,
  isEditable,
  isAuth,
  isLoading,
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      {isLoading ? (
        <PostCardHeader isLoading />
      ) : (
        <PostCardHeader
          _id={user._id}
          avatarUrl={user?.avatarUrl}
          fullName={user?.firstName + ' ' + user?.lastName}
          createdAt={createdAt}
        />
      )}
      {isLoading ? (
        <PostCardBody isLoading />
      ) : (
        <PostCardBody
          _id={_id}
          imageUrl={imageUrl}
          title={title}
          text={text}
          commentsCount={commentsCount}
          tags={tags}
          viewsCount={viewsCount}
          rating={rating}
        />
      )}
      {isLoading ? (
        <PostCardFooter isLoading />
      ) : (
        <PostCardFooter
          isEditable={isEditable}
          _id={_id}
          text={text}
          isAuth={isAuth}
        />
      )}
    </Card>
  );
};
