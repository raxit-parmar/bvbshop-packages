import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { cartReset } from '../../Redux/Cart/actions';
import { logoutUser } from '../../Redux/User/actions';
import { API } from '../../Utils/helper';
import { bvbCache } from '../../Utils/cache';

export const axiosInterceptor = {
  request: async (c) => {
    c.fromCache = false;
    const isCacheAble = !c.headers || (c.headers && c.headers.__ftlshop__cache !== false);
    if (isCacheAble) {
      const url = c.url;
      const baseURL = c.baseURL;
      const params = c.params;
      let language = 'nl';
      if (c?.headers && c?.headers['language']) {
        language = c?.headers['language'];
      }

      let cacheKey = '';
      cacheKey = Buffer.from(
        JSON.stringify({
          url,
          baseURL,
          params,
          data: c.data,
          headers: { language },
        }),
      ).toString('base64');
      c.ftlshopCacheTTL = c.headers.__ftlshop__cacheTTL;
      c.cacheKey = cacheKey;
      const cacheData = await bvbCache.get(cacheKey);
      if (cacheData) {
        c.data = cacheData;
        c.fromCache = true;
        // Set the request adapter to send the cached response and prevent the request from actually running
        c.adapter = () => {
          return Promise.resolve({
            data: cacheData,
            status: c.status,
            statusText: c.statusText,
            headers: c.headers,
            config: c,
            request: c,
          });
        };
      }
    }
    return c;
  },
  response: async (response) => {
    const isCacheAble =
      !response.config.headers || (response.config.headers && response.config.headers.__ftlshop__cache !== false);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const ftlshopCacheTTL = response.config.ftlshopCacheTTL;
    const fromCache = response.config.fromCache;
    const cacheKey = response.config.cacheKey;
    if (isCacheAble && !fromCache && cacheKey) {
      if (ftlshopCacheTTL) {
        await bvbCache.set(cacheKey, response.data, ftlshopCacheTTL);
      } else {
        await bvbCache.set(cacheKey, response.data);
      }
    }
    return response;
  },
};

const useAxiosInterceptors = ({ languageKey = 'language', post__logout = () => {} } = {}) => {
  const [cookies, setCookie, removeCookie]: any = useCookies([languageKey, 'auth', 'cartId', 'httpReferer']);
  const { auth, cartId, httpReferer } = cookies;
  const language = cookies[languageKey];
  const dispatch = useDispatch();
  const axiosInstance = API();

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE
    ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE)
    : false;

  const doLogout = () => {
    if (auth && auth.accessToken) {
      dispatch(logoutUser({}));
      if (typeof post__logout === 'function') {
        post__logout();
      }
      removeCookie('auth', { path: '/', secure: DEFAULT_COOKIE_SECURE });
      if (cartId) {
        /**
         * Remove cart after logout if cart is available
         */
        dispatch(cartReset());
        removeCookie('cartId', { path: '/', secure: DEFAULT_COOKIE_SECURE });
        // reset checkout as guest flag on logout
        removeCookie('checkoutAsGuest', { path: '/', secure: DEFAULT_COOKIE_SECURE });
      }
      window.location.reload();
    }
  };

  useEffect(() => {
    if (document.referrer) {
      const hostName = document.location.hostname;
      if (document.referrer && document.referrer.indexOf(hostName) === -1) {
        setCookie('httpReferer', document.referrer, { path: '/', secure: DEFAULT_COOKIE_SECURE });
      }
    }
    return () => {};
  }, [typeof document !== 'undefined' && document && document.referrer]);

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    async (c: any) => {
      if (auth && auth.accessToken) {
        c.headers['authorization'] = auth.accessToken;
      }
      c.headers['language'] = language;
      if (typeof window !== 'undefined') {
        c.headers['http-referer'] = httpReferer || document.referrer;
      }
      return await axiosInterceptor.request(c);
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    async (response: any) => {
      return await axiosInterceptor.response(response);
    },
    (error) => {
      if (error && error.response && error.response.status === 401) {
        doLogout();
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject((error.response && error.response.data) || error);
    },
  );

  return {
    dispatch,
    axiosInstance,
    doLogout,
  };
};

export default useAxiosInterceptors;
