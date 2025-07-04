import React from 'react';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  const routing = useRoutes(Router);
  return routing;
}

export default App;
