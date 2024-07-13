import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link as RouterLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import moment from 'moment';

export const FeaturedPost = ({ post, isPostsLoading }) => {
  return (
    <>
      {isPostsLoading && (
        <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Skeleton sx={{ width: 150 }} variant="text" animation="wave" />
              <Skeleton sx={{ width: 250 }} variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </CardContent>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                width: 200,
                height: 180,
                display: { xs: 'none', sm: 'block' },
              }}
            />
          </Card>
        </Grid>
      )}
      {!isPostsLoading && (
        <Grid item xs={12} md={6}>
          <CardActionArea component={RouterLink} to={`/posts/${post?._id}`}>
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {post?.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {moment(post?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post?.text.slice(0, 70) + '...'}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {'Continue reading...'}
                </Typography>
              </CardContent>
              {post?.imageUrl ? (
                <CardMedia
                  component="img"
                  sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
                  image={post?.imageUrl}
                  alt="Post"
                />
              ) : null}
            </Card>
          </CardActionArea>
        </Grid>
      )}
    </>
  );
};
