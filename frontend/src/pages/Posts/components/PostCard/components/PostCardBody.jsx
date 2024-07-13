import React from 'react';
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { PostData } from '../../../../../components/PostData/PostData';

export const PostCardBody = ({
  _id,
  title,
  imageUrl,
  text,
  tags,
  commentsCount,
  viewsCount,
  rating,
  isLoading,
}) => {
  return (
    <CardActionArea component={RouterLink} to={`/posts/${_id}`}>
      {isLoading ? (
        <Skeleton animation="wave" variant="rectangular" height={300} />
      ) : (
        <>
          {imageUrl ? (
            <CardMedia component="img" image={imageUrl} alt={title} />
          ) : null}
        </>
      )}
      <CardContent sx={{ pb: '2px' }}>
        <PostData
          title={title}
          text={text}
          tags={tags}
          commentsCount={commentsCount}
          viewsCount={viewsCount}
          rating={rating}
          isLoading={isLoading}
        />
      </CardContent>
    </CardActionArea>
  );
};
