import React from 'react';
import { Container } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default Layout;
