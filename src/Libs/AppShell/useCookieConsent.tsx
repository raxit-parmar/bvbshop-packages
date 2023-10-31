import { cookieConsent } from '../../API';
import { useCookies } from 'react-cookie';

export interface CookieConsentProps {
  cookieOptions?: any;
  post__cookie_consent?: (type?: string) => void;
}

const useCookieConsent = (props: CookieConsentProps = {}) => {
  const { cookieOptions = {}, post__cookie_consent } = props;
  const [, setCookie]: any = useCookies();

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE) : false;

  const handleOnClickCookieConsent = async (type: string) => {
    if (type === 'accept') {
      setCookie('FTLShopCookieConsent-legacy', true, { path: '/', secure: DEFAULT_COOKIE_SECURE, ...cookieOptions });
      setCookie('FTLShopCookieConsent', true, { path: '/', secure: DEFAULT_COOKIE_SECURE, ...cookieOptions });
      await cookieConsent({
        payload: {
          consent: 1,
        },
      });
    } else if (type === 'decline') {
      setCookie('FTLShopCookieConsent-legacy', false, { path: '/', secure: DEFAULT_COOKIE_SECURE, ...cookieOptions });
      setCookie('FTLShopCookieConsent', false, { path: '/', secure: DEFAULT_COOKIE_SECURE, ...cookieOptions });
      await cookieConsent({
        payload: {
          consent: 0,
        },
      });
    }
    if(typeof post__cookie_consent === 'function'){
      post__cookie_consent(type);
    }
  };

  return {
    handleOnClickCookieConsent,
  };
};

export default useCookieConsent;
