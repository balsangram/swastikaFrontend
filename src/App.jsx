import React from 'react';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  console.log("update");
  
  const routing = useRoutes(Router);
  return routing;
}

export default App;
