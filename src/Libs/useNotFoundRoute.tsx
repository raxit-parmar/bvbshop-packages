import React from 'react';
import { matchRoutes } from 'react-router-config';

const useNotFoundRoute = (routes, pathname, NotFoundScene) => {
  // Check routes match or not.
  const checkRoutes = matchRoutes(routes, pathname);

  if (checkRoutes.length === 0) {
    return <NotFoundScene />;
  }
};

export default useNotFoundRoute;
