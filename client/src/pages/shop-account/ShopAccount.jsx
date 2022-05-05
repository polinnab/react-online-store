import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AddProducts from '../../components/AddProducts/AddProducts';
import Orders from '../../components/Orders/Orders';
import UserInfo from '../../components/UserInfo/UserInfo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ShopAccount = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Products' {...a11yProps(0)} />
          <Tab label='Active orders' {...a11yProps(1)} />
          <Tab label='Orders history' {...a11yProps(2)} />
          <Tab label='Information' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddProducts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Orders type='Orders' />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Orders type='History' />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UserInfo/>
      </TabPanel>
    </Box>
  );
};

export default ShopAccount;
