import React from 'react';
import { CardHeader, Avatar, Skeleton, Link } from '@mui/material';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

export const PostCardHeader = ({
  _id,
  avatarUrl,
  fullName,
  createdAt,
  isLoading,
}) => {
  return (
    <CardHeader
      avatar={
        isLoading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        ) : (
          <Avatar aria-label="avatar" src={avatarUrl}></Avatar>
        )
      }
      title={
        isLoading ? (
          <Skeleton variant="text" animation="wave" height={15} width="10%" />
        ) : (
          <Link component={RouterLink} to={`/profile/${_id}`} underline="none">
            {fullName}
          </Link>
        )
      }
      subheader={
        isLoading ? (
          <Skeleton variant="text" animation="wave" height={15} width="40%" />
        ) : (
          <>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</>
        )
      }
    ></CardHeader>
  );
};
