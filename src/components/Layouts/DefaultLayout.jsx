import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Bottom from './Bottom';

const DefaultLayout = () => {
  return (
    <div>
     <Header />
      <main><Outlet /></main>
      <Bottom />
    </div>
  );
};

export default DefaultLayout;
