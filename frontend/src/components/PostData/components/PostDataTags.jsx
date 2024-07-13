import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Paper, Skeleton, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Assets
import TagIcon from '@mui/icons-material/Tag';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}));

export const PostDataTags = ({ tags, isLoading, isFullPost }) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 0.5, md: 1 }}
      sx={{
        mt: '10px',
      }}
    >
      {isLoading &&
        Array.from(new Array(3)).map((tag, index) => (
          <Skeleton
            key={index}
            animation="wave"
            variant="text"
            width={70}
            height={40}
          />
        ))}
      {!isLoading && tags.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No tags
        </Typography>
      )}
      {!isLoading &&
        tags.map((tag, index) => (
          <Item
            key={index}
            sx={{
              padding: isFullPost ? null : '5px',
              mb: isFullPost ? '5px' : null,
            }}
          >
            {isFullPost ? (
              <Button
                variant="outlined"
                component={RouterLink}
                to={`/posts/tag/${tag.title}`}
              >
                <TagIcon />
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ textTransform: 'none' }}
                >
                  {tag.title}
                </Typography>
              </Button>
            ) : (
              <>
                <TagIcon />
                <Typography component="span" variant="body2">
                  {tag.title}
                </Typography>
              </>
            )}
          </Item>
        ))}
    </Stack>
  );
};
