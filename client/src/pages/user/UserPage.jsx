import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import UserInfo from '../../components/UserInfo/UserInfo';
import UserHistory from '../../components/UserHistory/UserHistory';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const UserPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Personal information' {...a11yProps(0)} />
          <Tab label='Orders history' {...a11yProps(1)} />
          <Tab label='Favorites' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <UserInfo />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserHistory />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Favorites
      </TabPanel>
    </Box>
  );
};

export default UserPage;
