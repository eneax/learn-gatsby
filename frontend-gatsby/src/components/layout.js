import React from 'react';
import 'normalize.css';

import GlobalStyles from '../styles/globalStyles';
import Typography from '../styles/typography';
import Nav from './nav';
import Footer from './footer';

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <Typography />
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
