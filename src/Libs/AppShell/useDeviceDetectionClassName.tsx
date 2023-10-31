import { useEffect } from 'react';

export const applyDeviceDetectionClassName = ({ isMobile, isMobileOnly, type = 'body' }) => {
  const allClasses = ['ftlMobile', 'ftlMobileOnly', 'ftlDesktop'];
  allClasses.forEach((c) => {
    if (type === 'body') {
      document.body.className = `${document.body.className.replace(c, '')}`;
    }
    if (type === 'html') {
      document.getElementsByTagName('html')[0].className = `${document
        .getElementsByTagName('html')[0]
        .className.replace(c, '')}`;
    }
  });
  let ftlClassName = '';
  if (isMobileOnly) {
    ftlClassName = 'ftlMobile ftlMobileOnly';
  } else if (isMobile) {
    ftlClassName = 'ftlMobile';
  } else if (!isMobile) {
    ftlClassName = 'ftlDesktop';
  }
  if (type === 'body') {
    document.body.className = `${document.body.className} ${ftlClassName}`;
  }
  if (type === 'html') {
    document.getElementsByTagName('html')[0].className = `${
      document.getElementsByTagName('html')[0].className
    } ${ftlClassName}`;
  }
};

const useDeviceDetectionClassName = ({ isMobile, isMobileOnly, type = 'body' }) => {
  useEffect(() => {
    applyDeviceDetectionClassName({ isMobile, isMobileOnly, type });
    return () => {};
  }, [isMobile, isMobileOnly]);

  return null;
};

export default useDeviceDetectionClassName;
