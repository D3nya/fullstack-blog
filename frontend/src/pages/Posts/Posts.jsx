import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

// Components
import { TabsSection } from './components/TabsSection';
import { PostCard } from './components/PostCard/PostCard';
import { SideBlock } from '../../components/SideBlock/SideBlock';
import { Tags } from '../../components/Tags/Tags';
import { Comments } from '../../components/Comments/Comments';

// Router
import { useParams } from 'react-router-dom';

// Redux
import {
  fetchPosts,
  resetPostsState,
  setLimit,
  setSkip,
} from '../../store/slices/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector } from '../../store/slices/authSlice';

export const Posts = () => {
  const { ref, inView } = useInView({
    rootMargin: '200px',
    threshold: 1,
  });

  const { tag } = useParams();

  const [tabsValue, setTabsValue] = React.useState('');
  const [firstLoading, setFirstLoading] = React.useState(false);

  const dispatch = useDispatch();
  const { posts, auth } = useSelector((state) => state);
  const isAuth = useSelector(isAuthSelector);

  const isPostsLoading = posts.status === 'loading';
  const allPostsLoaded = posts.items.length >= posts.totalCount;

  // Reset posts state when tag changes
  useEffect(() => {
    dispatch(resetPostsState());
  }, [tag, tabsValue]);

  // First fetch
  useEffect(() => {
    if (posts.items.length === 0 && !firstLoading) {
      setFirstLoading(true);

      dispatch(
        fetchPosts({
          sort: tabsValue,
          tag,
          limit: posts.limit,
          skip: posts.skip,
        })
      )
        .unwrap()
        .then(() => {
          setFirstLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setFirstLoading(false);
        });
    }
  }, [posts.items.length]);

  // When in view div
  useEffect(() => {
    if (inView && !allPostsLoaded && !isPostsLoading && !posts.error) {
      if (posts.skip + posts.limit * 2 > posts.totalCount) {
        dispatch(
          setLimit(
            posts.limit - (posts.skip + posts.limit * 2 - posts.totalCount)
          )
        );
      }
      dispatch(setSkip(posts.skip + posts.limit));
    }
  }, [inView]);

  // fetchs
  useEffect(() => {
    if (posts.skip > 0 && !allPostsLoaded && !isPostsLoading) {
      dispatch(
        fetchPosts({
          sort: tabsValue,
          tag,
          limit: posts.limit,
          skip: posts.skip,
        })
      );
    }
  }, [posts.skip]);

  return (
    <>
      <TabsSection tabsValue={tabsValue} setTabsValue={setTabsValue} />
      {tag && (
        <Typography
          variant="h3"
          color={'text.secondary'}
          sx={{ mt: '10px' }}
        >{`#${tag}`}</Typography>
      )}
      <Grid container spacing={2} sx={{ mt: tag ? '0px' : '15px' }}>
        <Grid item md={8} xs={8}>
          {!isPostsLoading && !firstLoading && posts.items.length === 0 && (
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              No posts
            </Typography>
          )}
          {(firstLoading ? [...Array(posts.limit)] : posts.items).map(
            (post) => (
              <PostCard
                key={post?._id}
                _id={post?._id}
                title={post?.title}
                text={post?.text}
                imageUrl={post?.imageUrl}
                user={post?.user}
                createdAt={post?.createdAt}
                viewsCount={post?.viewsCount}
                commentsCount={post?.totalComments}
                tags={post?.tags}
                rating={post?.avgRating}
                isEditable={auth?.user?._id === post?.user?._id}
                isAuth={isAuth}
                isLoading={firstLoading}
              />
            )
          )}
          {!firstLoading &&
            isPostsLoading &&
            [...Array(posts.limit)].map((_, index) => (
              <PostCard key={index} isLoading={true} />
            ))}
          <Box
            ref={ref}
            style={{ height: '5px', backgroundColor: 'transparent' }}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={4}
          sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <SideBlock title="Tags">
            <Tags />
          </SideBlock>
          <SideBlock title="Comments">
            <Comments />
          </SideBlock>
        </Grid>
      </Grid>
    </>
  );
};
