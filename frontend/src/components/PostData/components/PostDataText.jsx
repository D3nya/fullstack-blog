import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const PostDataText = ({ text, isLoading }) => {
  return (
    <Typography variant="body1">
      {isLoading && (
        <Skeleton variant="text" animation="wave" width="100%" height={100} />
      )}
      {!isLoading && <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>}
    </Typography>
  );
};
