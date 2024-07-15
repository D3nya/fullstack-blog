import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Post } from './components/Post';
import { Comments } from '../../components/Comments/Comments';
import { AddComment } from './components/AddComment';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SideBlock } from '../../components/SideBlock/SideBlock';
import { fetchPost } from '../../store/slices/postsSlice';

export const FullPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, auth } = useSelector((state) => state);

  const userData = auth.user;
  const post = posts.items[0];
  const isLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  return (
    <>
      <Paper sx={{ mt: '15px', padding: '15px', pb: '0px' }}>
        <Post
          post={post}
          isLoading={isLoading}
          isEditable={userData?._id === post?.user?._id}
        />
      </Paper>
      <SideBlock
        title="Comments"
        sx={{ mt: '15px', mb: '15px', padding: '15px' }}
      >
        <Comments postId={id} isFullPost isLoading={isLoading} />
        <AddComment id={id} isLoading={isLoading} />
      </SideBlock>
    </>
  );
};
