import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const DefaultLayout = () => {
  return (
    <div>
     <Header />
      <main><Outlet /></main>
    </div>
  );
};

export default DefaultLayout;
