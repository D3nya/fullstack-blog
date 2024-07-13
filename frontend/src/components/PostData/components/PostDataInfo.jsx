import React from 'react';
import {
  Badge,
  Box,
  List,
  ListItem,
  ListItemIcon,
  Skeleton,
  Rating,
} from '@mui/material';

// Assets
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CommentIcon from '@mui/icons-material/Comment';

export const PostDataInfo = ({
  commentsCount,
  viewsCount,
  rating,
  isLoading,
  isFullPost,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: isFullPost ? '10px' : 0,
      }}
    >
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="rounded"
          width="100%"
          height={isFullPost ? '25px' : '15px'}
          sx={{ mb: '5px' }}
        ></Skeleton>
      ) : (
        <Rating
          name="read-only-rating"
          value={rating}
          precision={0.5}
          size={isFullPost ? 'medium' : 'small'}
          readOnly
        />
      )}
      <List
        sx={{
          display: 'inline-flex',
          pt: '0px',
          pr: '5px',
        }}
      >
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={30}
            height={30}
            sx={{ mr: '10px' }}
          />
        ) : (
          <ListItem sx={{ pl: '8px', pr: '8px' }}>
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <Badge
                badgeContent={commentsCount}
                color="primary"
                showZero
                max={999}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <CommentIcon />
              </Badge>
            </ListItemIcon>
          </ListItem>
        )}
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={30}
            height={30}
          />
        ) : (
          <ListItem sx={{ pl: '8px', pr: '8px' }}>
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <Badge
                badgeContent={viewsCount}
                color="primary"
                showZero
                max={999}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <RemoveRedEyeIcon />
              </Badge>
            </ListItemIcon>
          </ListItem>
        )}
      </List>
    </Box>
  );
};
