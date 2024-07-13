import React, { useEffect } from 'react';

// MUI
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';

// Router
import { Link as RouterLink } from 'react-router-dom';

// Icons
import TagIcon from '@mui/icons-material/Tag';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../../store/slices/tagsSlice';

export const Tags = () => {
  const dispatch = useDispatch();

  const { tags } = useSelector((state) => state);
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const getRandomTags = (tags) => {
    return [...tags.items].sort(() => Math.random() - 0.5).slice(0, 5);
  };

  const randomedTags = React.useMemo(() => getRandomTags(tags), [tags]);

  return (
    <List>
      {isTagsLoading &&
        Array.from(new Array(5)).map((tag, index) => (
          <ListItemButton key={index}>
            <ListItemText>
              <Typography component="span" variant="body2" color="primary">
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={30}
                  width="50%"
                />
              </Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      {!isTagsLoading && tags.items.length === 0 && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          No tags
        </Typography>
      )}
      {!isTagsLoading &&
        randomedTags.map((tag, index) => (
          <ListItemButton
            key={index}
            component={RouterLink}
            to={`/posts/tag/${tag.title}`}
          >
            <ListItemIcon sx={{ minWidth: 'auto', mr: '2px' }}>
              <TagIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              <Typography component="span" variant="body2" color="primary">
                {tag.title}
              </Typography>
            </ListItemText>
          </ListItemButton>
        ))}
    </List>
  );
};
