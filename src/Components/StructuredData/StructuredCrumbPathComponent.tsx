import React from 'react';
import { Generic, GenericCollection, JSONLD } from 'react-structured-data';

declare const process: any;

export interface StructuredCrumbPathComponentProps {
  crumbPath: {
    [key: string]: any;
    id?: string;
    name?: string;
    slug?: string;
  }[];
}

const StructuredCrumbPathComponent = (props: StructuredCrumbPathComponentProps) => {
  const { crumbPath = [] } = props;

  return (
    <JSONLD dangerouslyExposeHtml={true}>
      <Generic type="breadcrumbList" jsonldtype="BreadcrumbList">
        <GenericCollection type="itemListElement">
          {crumbPath.map((crumbPath, key) => (
            <Generic
              key={`bread_crumb_${key}`}
              jsonldtype="ListItem"
              schema={{ position: key + 1, name: crumbPath.name, item: `${process.env.ENDPOINT}/${crumbPath.slug}` }}
            />
          ))}
        </GenericCollection>
      </Generic>
    </JSONLD>
  );
};

export default StructuredCrumbPathComponent;
