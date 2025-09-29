import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Tabs({ TabItems, setTab, tab }) {
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        typography: 'body1',
        mb: 2,
        mt: 2,
      }}
    >
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {TabItems?.map((item) => (
              <Tab
                label={item}
                value={item}
                key={item}
                sx={{ textTransform: 'none' }}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
