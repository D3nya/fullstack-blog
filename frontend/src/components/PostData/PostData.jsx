import React from 'react';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import Markdown from 'react-markdown';

// Assets
import { PostDataTags } from './components/PostDataTags';
import { PostDataInfo } from './components/PostDataInfo';
import { PostActions } from '../../components/PostActions/PostActions';
import { PostDataText } from './components/PostDataText';

export const PostData = ({
  _id,
  title,
  tags,
  text,
  commentsCount,
  viewsCount,
  rating,
  isEditable,
  isFullPost,
  isLoading,
}) => {
  return (
    <>
      <Typography gutterBottom variant="h4">
        {isLoading ? (
          <Skeleton animation="wave" variant="text" width="80%" />
        ) : (
          title
        )}
      </Typography>
      {isFullPost ? null : (
        <Typography variant="body2" color="text.secondary">
          {isLoading ? (
            <Skeleton animation="wave" variant="text" width="40%" />
          ) : (
            <Markdown>{text.slice(0, 80) + '...'}</Markdown>
          )}
        </Typography>
      )}
      {isFullPost ? (
        <Box sx={{ mb: '20px', overflow: 'hidden', padding: '5px' }}>
          <PostDataText text={text} isLoading={isLoading} />
        </Box>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: isFullPost ? 'column' : 'row',
          alignItems: isFullPost ? 'flex-start' : 'center',
          mb: '5px',
        }}
      >
        <PostDataTags
          tags={tags}
          isFullPost={isFullPost}
          isLoading={isLoading}
        />

        <PostDataInfo
          rating={rating}
          commentsCount={commentsCount}
          viewsCount={viewsCount}
          isLoading={isLoading}
          isFullPost={isFullPost}
        />
      </Box>
      <Divider sx={{ mt: '5px', mb: '5px' }} />
      {isFullPost ? (
        <Box>
          <PostActions
            isEditable={isEditable}
            isLoading={isLoading}
            _id={_id}
          />
        </Box>
      ) : null}
    </>
  );
};
