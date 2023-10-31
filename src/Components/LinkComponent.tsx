import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { deepClone } from '../Utils';

const LinkComponent = (props: NavLinkProps) => {
  const { children, to, target = '_blank', ...rest } = props;

  let isLinkWithSameOrigin = true;
  const endpoint = `${process.env.ENDPOINT}/` || '';
  let newTo = deepClone(to);

  if (newTo && typeof newTo === 'string' && (newTo.indexOf('http://') !== -1 || newTo.indexOf('https://') !== -1)) {
    if (newTo.indexOf(endpoint) > -1) {
      newTo = newTo.replace(endpoint, '');
      if(newTo[0] !== '/'){
        newTo = `/${newTo}`
      }
    } else {
      isLinkWithSameOrigin = false;
    }
  }

  if (!isLinkWithSameOrigin) {
    let href = newTo;
    if (href[0] === '/') {
      href = href.substring(1);
    }

    return (
      <a href={href} target={target} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NavLink to={newTo} {...rest}>
      {children}
    </NavLink>
  );
};

export default LinkComponent;
