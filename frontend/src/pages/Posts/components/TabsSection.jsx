import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export const TabsSection = ({ setTabsValue, tabsValue, setSkip, setLimit }) => {
  const handleChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tabsValue} onChange={handleChange}>
        <Tab label="All" value={''} />
        <Tab label="New" value={'new'} />
        <Tab label="Popular" value={'popular'} />
        <Tab label="Best" value={'best'} />
      </Tabs>
    </Box>
  );
};
