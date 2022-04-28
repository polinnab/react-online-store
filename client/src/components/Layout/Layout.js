import React from 'react';
import { Container } from '@mui/material'
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header/>
      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default Layout;
