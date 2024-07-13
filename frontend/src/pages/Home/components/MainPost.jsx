import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';

export const MainPost = ({ post, isPostsLoading }) => {
  return (
    <>
      {isPostsLoading && (
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height={300}
        />
      )}
      {!isPostsLoading && (
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mt: 4,
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${post?.imageUrl})`,
          }}
        >
          {<img style={{ display: 'none' }} src={post?.imageUrl} alt="Post" />}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.3)',
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {post?.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {post?.text.slice(0, 100) + '...'}
                </Typography>
                <Link
                  component={RouterLink}
                  to={`/posts/${post?._id}`}
                  variant="subtitle1"
                  href="#"
                >
                  {'Continue reading...'}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};
