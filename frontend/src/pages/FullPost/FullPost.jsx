import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Post } from './components/Post';
import { Comments } from '../../components/Comments/Comments';
import { AddComment } from './components/AddComment';

// Redux
import { useSelector } from 'react-redux';
import { SideBlock } from '../../components/SideBlock/SideBlock';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const userData = useSelector((state) => state.auth.user);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <Paper sx={{ mt: '15px', padding: '15px', pb: '0px' }}>
        <Post
          post={data}
          isLoading={isLoading}
          isEditable={userData?._id === data?.user?._id}
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
