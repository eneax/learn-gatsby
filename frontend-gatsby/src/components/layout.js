import React from 'react';
import 'normalize.css';

import GlobalStyles from '../styles/globalStyles';
import Nav from './nav';
import Footer from './footer';

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
