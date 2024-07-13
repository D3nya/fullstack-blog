import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box, Divider, Grid, Skeleton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/slices/profileSlice';
import { Link as RouterLink } from 'react-router-dom';
import { fetchPosts, resetPostsState } from '../../store/slices/postsSlice';
import { FeaturedPost } from '../../components/FeaturedPost/FeaturedPost';
import moment from 'moment';

export const Profile = () => {
  const { id } = useParams();

  const { profiles, auth, posts } = useSelector((state) => state);

  const userPosts = posts?.items;

  const profile = profiles?.items;
  const profileId = profile?._id;

  const isAuthedProfile = profile?._id === auth?.user?._id;

  const isPostsLoading = posts?.status === 'loading';
  const isProfileLoading = profiles?.status === 'loading';

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetPostsState());
  }, []);

  React.useEffect(() => {
    dispatch(fetchProfile(id));
  }, [id]);

  React.useEffect(() => {
    if (profileId && !isPostsLoading) {
      dispatch(fetchPosts({ profileId, limit: posts.limit, skip: posts.skip }));
    }
  }, [profileId]);

  return (
    <>
      {isProfileLoading && (
        <Card variant="outlined" sx={{ mt: 2 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={{ p: '1.5rem 0rem', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="circular">
                  <Avatar sx={{ width: 100, height: 100, mb: 1.5 }} />
                </Skeleton>
              </Box>
              <Skeleton>
                <Typography variant="h6">Profile login</Typography>
              </Skeleton>
              <Skeleton>
                <Typography color="text.primary">Profile name</Typography>
              </Skeleton>
              <Skeleton>
                <Typography color="text.secondary">Profile date</Typography>
              </Skeleton>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Divider />
                {[...Array(3)].map((item, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        pl: 1,
                      }}
                    >
                      <Skeleton width={200} height={40}>
                        <Typography
                          sx={{ padding: '1rem', color: 'text.secondary' }}
                        >
                          Total posts
                        </Typography>
                      </Skeleton>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Divider />
                {[...Array(3)].map((item, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        pr: 1,
                      }}
                    >
                      <Skeleton width={50} height={40}>
                        <Typography
                          sx={{ padding: '1rem 2rem', color: 'text.secondary' }}
                        >
                          Profile count
                        </Typography>
                      </Skeleton>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
      {!isProfileLoading && (
        <Card variant="outlined" sx={{ mt: 2 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={{ p: '1.5rem 0rem', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  sx={{ width: 100, height: 100, mb: 1.5 }}
                  src={profile.avatarUrl}
                />
              </Box>
              <Typography variant="h6">{profile.login}</Typography>
              <Typography color="text.primary">
                {profile.firstName + ' ' + profile.lastName}
              </Typography>
              <Typography color="text.secondary">
                {`Created at ${moment(profile.createdAt).format('MMM Do YY')}`}
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Divider />
                <Typography sx={{ padding: '1rem', color: 'text.secondary' }}>
                  Total posts
                </Typography>
                <Divider />
                <Typography sx={{ padding: '1rem', color: 'text.secondary' }}>
                  Total comments
                </Typography>
                <Divider />
                {isAuthedProfile && (
                  <>
                    <Typography
                      sx={{ padding: '1rem', color: 'text.secondary' }}
                    >
                      Favourites
                    </Typography>
                    <Divider />
                  </>
                )}
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'end' }}>
                <Divider />
                <Typography
                  sx={{ padding: '1rem 2rem', color: 'text.secondary' }}
                >
                  {profile.postsCount}
                </Typography>
                <Divider />
                <Typography
                  sx={{ padding: '1rem 2rem', color: 'text.secondary' }}
                >
                  {profile.commentsCount}
                </Typography>
                <Divider />
                {isAuthedProfile && (
                  <>
                    <Typography
                      sx={{ padding: '1rem 2rem', color: 'text.secondary' }}
                    >
                      {profile.favouritesCount}
                    </Typography>
                    <Divider />
                  </>
                )}
              </Grid>
            </Grid>
            {isAuthedProfile && (
              <Grid
                item
                sx={{ width: '100%' }}
                display="flex"
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  sx={{ width: '99%', p: 1, my: 2 }}
                  component={RouterLink}
                  to={`/profile/${auth.user?._id}/edit`}
                >
                  Edit profile
                </Button>
              </Grid>
            )}
          </Grid>
        </Card>
      )}
      <Card variant="outlined" sx={{ mt: 2 }}>
        <Typography variant="h5" textAlign="center" sx={{ p: '5px' }}>
          Users Posts
        </Typography>
        <Grid container spacing={4} sx={{ p: 2 }}>
          {isPostsLoading &&
            [...Array(2)].map((item, index) => (
              <FeaturedPost key={index} isPostsLoading={isPostsLoading} />
            ))}
          {!isPostsLoading && !userPosts && (
            <Typography variant="h6" sx={{ m: '10px', p: 3 }}>
              No user posts
            </Typography>
          )}
          {userPosts &&
            userPosts.map((post) => (
              <FeaturedPost key={post?._id} post={post} />
            ))}
        </Grid>
      </Card>
      {isAuthedProfile && (
        <Card variant="outlined" sx={{ mt: 2 }}>
          <Typography variant="h5" textAlign="center" sx={{ p: '5px' }}>
            Favourite Posts
          </Typography>
          <Grid container spacing={4} sx={{ p: 2 }}>
            {isProfileLoading &&
              [...Array(2)].map((item, index) => (
                <FeaturedPost key={index} isPostsLoading={isProfileLoading} />
              ))}
            {!isProfileLoading && profile?.favourites?.length === 0 && (
              <Typography variant="h6" sx={{ m: '10px', p: 3 }}>
                No favourite posts
              </Typography>
            )}
            {profile?.favourites &&
              profile?.favourites.map((post) => (
                <FeaturedPost key={post?._id} post={post} />
              ))}
          </Grid>
        </Card>
      )}
    </>
  );
};
