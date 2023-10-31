import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doRegister, registerReset } from '../Redux/Auth/actions';
import { deepClone } from '../Utils';
import useLoginStatus from './useLoginStatus';
import { useCookies } from 'react-cookie';

interface SignupContainerHooksProps {
  loadCartId?: string;
  onSubmit?: (v?: any) => void;
  onModal?: boolean;
  history?: any;
  redirectURL?: string;
  post__signUp?: (d?: any) => void;
}

const useSignupContainer = (props: SignupContainerHooksProps) => {
  const dispatch = useDispatch();
  const [redirectLink, setRedirectLink] = useState(null);
  const [cookies, setCookie, removeCookie]: any = useCookies(['auth', 'httpReferer', 'registeredUser', 'redirectLink']);

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE
    ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE)
    : false;

  const {
    loadCartId,
    onSubmit = (values: any) => {
      const payload = deepClone(values);
      delete payload.confirmEmail;
      if (payload && !(payload.socialMedia && payload.socialMedia.type)) {
        removeCookie('redirectLink', { path: '/', secure: DEFAULT_COOKIE_SECURE });
      }
      dispatch(doRegister(payload));
    },
    onModal,
    history,
    redirectURL,
    post__signUp,
  } = props;
  const {
    formValues,
    registerState,
  }: {
    formValues: any;
    registerState: {
      data: any;
      isLoading: boolean;
      error: string;
    };
  } = useSelector((state: any) => ({
    formValues: state.form.signup && state.form.signup.values,
    registerState: state.register,
  }));
  const [isLogin] = useLoginStatus(registerState, loadCartId);
  const route: any = useSelector((state: any) => state.route);

  const onAppleSignup = (token) => {
    if (token) {
      onSubmit({
        socialMedia: {
          type: 'apple',
          data: {
            id: token,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!onModal) {
      if (route && route.queryParam && route.queryParam.token) {
        onAppleSignup(route.queryParam.token);
      }
    }
    return () => {
      dispatch(registerReset());
    };
  }, []);

  useEffect(() => {
    if (!onModal && cookies.auth && isLogin && cookies.redirectLink) {
      setRedirectLink(cookies.redirectLink);
      removeCookie('redirectLink', { path: '/', secure: DEFAULT_COOKIE_SECURE });
    }
    return () => {};
  }, [cookies.redirectLink, cookies.auth, onModal, isLogin]);

  useEffect(() => {
    if (registerState && registerState.data && registerState.data.success) {
      if (typeof post__signUp === 'function') {
        post__signUp(registerState.data);
      }
      removeCookie('httpReferer', { path: '/', secure: DEFAULT_COOKIE_SECURE });
      setCookie('registeredUser', JSON.stringify(formValues), {
        path: '/',
        secure: DEFAULT_COOKIE_SECURE,
        maxAge: 1 * 60 * 60,
      });
      history.push(redirectURL);
    }
    return () => {};
  }, [registerState]);

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

  const onFbSignup = (data) => {
    if (data.id) {
      onSubmit({
        ...__setName(data.name),
        email: data.email,
        socialMedia: {
          type: 'facebook',
          data: {
            id: data.id,
            token: data.accessToken,
          },
        },
      });
    }
  };

  const onGoogleSignup = (data) => {
    if (data && data.googleId) {
      onSubmit({
        ...__setName(data.profileObj.name),
        email: data.profileObj.email,
        socialMedia: {
          type: 'google',
          data: {
            id: data.googleId,
            token: data.tokenId,
          },
        },
      });
    }
  };

  return {
    isLogin,
    formValues,
    registerState,
    onSubmit,
    onAppleSignup,
    onFbSignup,
    onGoogleSignup,
    redirectLink,
    setRedirectLink,
    cookies,
    setCookie,
    removeCookie,
  };
};

export default useSignupContainer;
