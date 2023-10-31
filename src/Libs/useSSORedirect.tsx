import { useCookies } from 'react-cookie';

export interface useSSORedirectProps {
  onModal?: boolean;
  isMobile?: boolean;
}

const useSSORedirect = (props: useSSORedirectProps) => {
  const { onModal, isMobile } = props;

  const [, setCookie, removeCookie]: any = useCookies(['redirectLink']);

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE) : false;

  const setRedirectLink = () => {
    setCookie('redirectLink', window.location.pathname, { path: '/', secure: DEFAULT_COOKIE_SECURE, maxAge: 5 * 60 });
  };

  const onGoogleSSOClick = (e, click: any) => {
    removeCookie('redirectLink', { path: '/', secure: DEFAULT_COOKIE_SECURE });
    click(e);
  };

  const onAppleSSOClick = (e, click: any) => {
    removeCookie('redirectLink', { path: '/', secure: DEFAULT_COOKIE_SECURE });
    if (onModal) {
      setRedirectLink();
    }
    click(e);
  };

  const onFBSSOClick = (e, click: any) => {
    removeCookie('redirectLink', { path: '/', secure: DEFAULT_COOKIE_SECURE });
    if (isMobile && onModal) {
      setRedirectLink();
    }
    click(e);
  };

  return {
    onGoogleSSOClick,
    onAppleSSOClick,
    onFBSSOClick,
  };
};

export default useSSORedirect;
