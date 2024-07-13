import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, resetPostsState } from '../../store/slices/postsSlice';
import { MainPost } from './components/MainPost';
import { Box, Grid, Typography } from '@mui/material';
import { FeaturedPost } from '../../components/FeaturedPost/FeaturedPost';

export const Home = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state);

  let mainPost;
  let featuredPosts;

  if (posts?.items.length > 0) {
    mainPost = posts.items[0];
  }

  if (posts?.items.length > 2) {
    featuredPosts = [posts.items[1], posts.items[2]];
  }

  if (posts?.items.length > 4) {
    featuredPosts = [...featuredPosts, posts.items[3], posts.items[4]];
  }

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(resetPostsState());
  }, []);

  React.useEffect(() => {
    dispatch(fetchPosts({ limit: 5, sort: 'new' }));
  }, [dispatch]);

  return (
    <main>
      <Box
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        {isPostsLoading && <MainPost isPostsLoading={isPostsLoading} />}
        {!isPostsLoading && !mainPost && (
          <Typography variant="h2" textAlign="center">
            No main post
          </Typography>
        )}
        {mainPost && <MainPost post={mainPost} />}
      </Box>
      <Grid container spacing={4}>
        {isPostsLoading &&
          [...Array(4)].map((item, index) => (
            <FeaturedPost key={index} isPostsLoading={isPostsLoading} />
          ))}
        {!isPostsLoading && !featuredPosts && (
          <Typography variant="h4" sx={{ m: '10px' }}>
            No featured posts
          </Typography>
        )}
        {featuredPosts &&
          featuredPosts.map((post) => (
            <FeaturedPost key={post?._id} post={post} />
          ))}
      </Grid>
    </main>
  );
};
