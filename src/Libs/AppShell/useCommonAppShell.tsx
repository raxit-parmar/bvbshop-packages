import { useState } from 'react';

export interface CommonAppShellProps {
  [key: string]: any;
}

const useCommonAppShell = (props?: CommonAppShellProps) => {
  const [skeletonType, setSkeletonType] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleFilterMenu, setToggleFilterMenu] = useState(false);

  return {
    skeletonType,
    setSkeletonType,
    toggleMenu,
    setToggleMenu,
    toggleFilterMenu,
    setToggleFilterMenu,
  };
};

export default useCommonAppShell;
