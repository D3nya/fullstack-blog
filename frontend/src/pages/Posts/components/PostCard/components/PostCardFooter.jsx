import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  CardActions,
  IconButton,
  Collapse,
  CardContent,
  Tooltip,
} from '@mui/material';

// Assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { PostActions } from '../../../../../components/PostActions/PostActions';
import { PostDataText } from '../../../../../components/PostData/components/PostDataText';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PostCardFooter = ({
  _id,
  text,
  isEditable,
  isLoading,
  isAuth,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardActions disableSpacing>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <PostActions
            _id={_id}
            isEditable={isEditable}
            isLoading={isLoading}
            isAuth={isAuth}
          />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Tooltip title="More">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ overflow: 'hidden', padding: '5px' }}>
            <PostDataText text={text} isLoading={isLoading} />
          </Box>
        </CardContent>
      </Collapse>
    </>
  );
};
