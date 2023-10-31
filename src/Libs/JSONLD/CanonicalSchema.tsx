import React from 'react';
import MetaTags from 'react-meta-tags';
import { useSelector } from 'react-redux';
import { generateQueryString } from '../../Utils';


export interface CanonicalSchemaProps {
  match?: {
    path?: 'string';
    url?: 'string';
    isExact?: 'string';
    parmas?: any;
  };
}

const CanonicalSchema: any = (props: CanonicalSchemaProps) => {
  const { match: { url = '' } = {} } = props;
  const route: any = useSelector((state: any) => state.route);

  if (!url) {
    return null;
  }

  return (
    <MetaTags>
      <link
        rel="canonical"
        href={`${process.env.ENDPOINT}${url}${
          route && route.queryParam && Object.keys(route.queryParam).length > 0
            ? `?${generateQueryString(route.queryParam)}`
            : ''
        }`}
      />
    </MetaTags>
  );
};

export default CanonicalSchema;
