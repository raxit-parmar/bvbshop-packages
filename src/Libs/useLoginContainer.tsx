import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginReset, doLogin } from '../Redux/Auth/actions';
import { sendVerifyEmail } from '../Redux/Auth/api';
import useLoginStatus from './useLoginStatus';
import { useCookies } from 'react-cookie';
import { deepClone } from '../Utils';

export interface LoginData {
  username?: string;
  password?: string;
  socialMedia?: {
    type?: 'facebook' | 'google' | 'apple';
    data?: {
      id?: string;
      email?: string;
      token?: string;
      code?: string;
      state?: string;
    };
  };
}

interface LoginContainerHooksProps {
  loadCartId?: string;
  onSubmit?: (v?: any) => void;
  post__login?: (d?: any) => void;
  onModal?: boolean;
  route?: any;
  config?: any;
}

const useLoginContainer = (props: LoginContainerHooksProps) => {
  const dispatch = useDispatch();
  const [redirectLink, setRedirectLink] = useState(null);
  const [cookies, , removeCookie]: any = useCookies(['auth', 'redirectLink', 'cartId']);

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE
    ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE)
    : false;

  const {
    loadCartId,
    post__login,
    onSubmit = (values: LoginData) => {
      if (values && !(values.socialMedia && values.socialMedia.type)) {
        removeCookie('redirectLink', { path: '/', secure: DEFAULT_COOKIE_SECURE });
      }
      const payload = deepClone(values);
      if (props?.config?.isCartIdSentToBackend && cookies?.cartId) {
        payload.cartId = cookies?.cartId;
      }
      dispatch(doLogin(payload));
    },
    onModal,
    route,
  } = props;
  const loginState: {
    data: any;
    isLoading: boolean;
    error: string;
  } = useSelector((state: any) => state.login);
  const [isLogin, emailVerificationHash] = useLoginStatus(loginState, loadCartId, post__login);
  const [isVerifyEmailSent, setIsVerifyEmailSent] = useState(false);

  const onAppleLogin = (token) => {
    if (token) {
      const payload: any = {
        socialMedia: {
          type: 'apple',
          data: {
            id: token,
          },
        },
      };
      if (props?.config?.isCartIdSentToBackend && cookies?.cartId) {
        payload.cartId = cookies?.cartId;
      }
      onSubmit(payload);
    }
  };

  const onApplePopupLogin = ({ idToken, code, state }) => {
    if (idToken && code && state) {
      const payload: any = {
        socialMedia: {
          type: 'apple',
          data: {
            code,
            state,
            token: idToken,
          },
        },
      };
      if (props?.config?.isCartIdSentToBackend && cookies?.cartId) {
        payload.cartId = cookies?.cartId;
      }
      onSubmit(payload);
    }
  };

  useEffect(() => {
    if (!onModal || (route && route.name === 'login')) {
      if (route && route.queryParam && route.queryParam.token) {
        onAppleLogin(route.queryParam.token);
      }
    }
    return () => {
      dispatch(loginReset());
    };
  }, []);

  useEffect(() => {
    if (!onModal && cookies.auth && cookies.redirectLink) {
      setRedirectLink(cookies.redirectLink);
      removeCookie('redirectLink', { path: '/', secure: DEFAULT_COOKIE_SECURE });
    }
    return () => {};
  }, [cookies.redirectLink, cookies.auth, onModal]);

  const __setName = (name) => {
    const nameObj = {};
    const nameSplit = name.split(' ');
    nameObj['firstName'] = nameSplit[0];
    if (nameSplit.length === 2) {
      nameObj['lastName'] = nameSplit[1];
    } else if (nameSplit.length === 3) {
      nameObj['lastName'] = nameSplit[2];
      nameObj['middleName'] = nameSplit[1];
    } else if (nameSplit.length > 3) {
      nameSplit.splice(0, 1);
      nameObj['lastName'] = nameSplit.join(' ');
    }
    return nameObj;
  };

  const onFbLogin = (data) => {
    if (data && data.id) {
      const payload: any = {
        socialMedia: {
          type: 'facebook',
          data: {
            id: data.id,
            email: data.email,
            ...__setName(data.name),
            token: data.accessToken,
          },
        },
      };
      if (props?.config?.isCartIdSentToBackend && cookies?.cartId) {
        payload.cartId = cookies?.cartId;
      }
      onSubmit(payload);
    }
  };

  const onGoogleLogin = (data) => {
    if (data && data.googleId) {
      const payload: any = {
        socialMedia: {
          type: 'google',
          data: {
            id: data.profileObj.googleId,
            email: data.profileObj.email,
            ...__setName(data.profileObj.name),
            token: data.tokenId,
          },
        },
      };
      if (props?.config?.isCartIdSentToBackend && cookies?.cartId) {
        payload.cartId = cookies?.cartId;
      }
      onSubmit(payload);
    }
  };

  const sendVerificationEmail = async () => {
    if (emailVerificationHash) {
      const data = await sendVerifyEmail({ hash: emailVerificationHash });
      if (data) {
        setIsVerifyEmailSent(true);
      }
    }
  };

  return {
    isLogin,
    onSubmit,
    loginState,
    emailVerificationHash,
    isVerifyEmailSent,
    setIsVerifyEmailSent,
    onAppleLogin,
    onApplePopupLogin,
    onFbLogin,
    onGoogleLogin,
    sendVerificationEmail,
    redirectLink,
    setRedirectLink,
    cookies,
  };
};

export default useLoginContainer;
