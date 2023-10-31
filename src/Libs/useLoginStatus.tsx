import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../Redux/Cart';
import { fetchCheckoutReset } from '../Redux/Checkout/actions';
import { fetchLoginUser } from '../Redux/User/actions';

export interface LoginStateInterface {
  data: any;
  isLoading: boolean;
  error: string;
}

export interface LoginUserInterface {
  data?: {
    [key: string]: any;
    accessToken: string;
    user: any;
  };
  isLogin?: boolean;
  error?: string;
  isLoading?: boolean;
}

const useLoginStatus = (loginState: LoginStateInterface, loadCartId?: string, post__login?: (d?: any) => void) => {
  const [isLogin, setIsLogin] = useState(false);
  const [emailVerificationHash, setEmailVerificationHash] = useState(null);
  const loginUser: LoginUserInterface = useSelector((state: any) => state.loginUser);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie]: any = useCookies(['auth']);

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE) : false;

  useEffect(() => {
    if (loginUser.isLogin && loginState.data && loginState.data.accessToken) {
      setCookie('auth', JSON.stringify(loginState.data), { path: '/', secure: DEFAULT_COOKIE_SECURE });
      // reset checkout as guest flag on login
      removeCookie('checkoutAsGuest', { path: '/', secure: DEFAULT_COOKIE_SECURE });
      setIsLogin(true);
    }
    return () => {};
  }, [loginUser]);

  useEffect(() => {
    if (loginState && loginState.data) {
      if (typeof post__login === 'function' && loginState.data.user && loginState.data.user.id) {
        post__login(loginState.data);
      }
      if (loginState.data.verifyEmail === false && loginState.data.user && loginState.data.user.hash) {
        setEmailVerificationHash(loginState.data.user.hash);
      }
      if (loginState.data.accessToken) {
        dispatch(fetchLoginUser({ authorization: loginState.data.accessToken }));
        // If there is no loadCartId passed in this container then only it come through in condition
        if (!loadCartId) {
          // Check if login user have any existing cart? if any cart will be loaded
          if (loginState.data.cartId && cookies.cartId !== loginState.data.cartId) {
            setCookie('cartId', loginState.data.cartId, { path: '/', secure: DEFAULT_COOKIE_SECURE });
            dispatch(fetchCart({ cartId: loginState.data.cartId, authorization: loginState.data.accessToken }));
          }
          // If user already created cart and there is no cart in login response then this cart id save to user profile so next time user login user gets the same cart.
          if (cookies.cartId && !loginState.data.cartId) {
            dispatch(fetchCart({ cartId: cookies.cartId, authorization: loginState.data.accessToken }));
          }
        } else {
          dispatch(fetchCart({ cartId: loadCartId, authorization: loginState.data.accessToken }));
        }
      }
    }
    return () => {
      if (loginState && loginState.data && loginState.data.accessToken) {
        // Reset checkout state so personal info fetch again for the login user
        dispatch(fetchCheckoutReset());
      }
    };
  }, [loginState]);

  return [isLogin, emailVerificationHash];
};

export default useLoginStatus;
