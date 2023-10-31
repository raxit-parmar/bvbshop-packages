import React from 'react';
import MetaTags from 'react-meta-tags';
import { generateQueryString } from '../Utils';

interface RouteData {
  [key: string]: any;
  queryParam?: any;
  path?: string;
  url?: string;
  isExact?: boolean;
  params?: any;
  name?: string;
  history?: RouteData[];
}

export interface CanonicalComponentProps {
  route: RouteData;
  ignoreRoutes: string[];
}

const CanonicalComponent = (props: CanonicalComponentProps) => {
  const { route, ignoreRoutes } = props;

  if (!route || (route && route.name && ignoreRoutes.indexOf(route.name) !== -1)) {
    return null;
  }

  return (
    <MetaTags>
      <link
        rel="canonical"
        href={`${process.env.ENDPOINT}${route.url}${
          route && route.queryParam && Object.keys(route.queryParam).length > 0
            ? `?${generateQueryString(route.queryParam)}`
            : ''
        }`}
      />
    </MetaTags>
  );
};

export default CanonicalComponent;
