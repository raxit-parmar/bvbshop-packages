import { useEffect } from 'react';

declare const window;

const useRemoteDomain = ({ cartId, auth }: { cartId?: string; auth?: any }) => {
  useEffect(() => {
    if (window.remote && window.remote.length > 0) {
      window.remote.forEach((r) => {
        r.postMessage(
          JSON.stringify({
            action: 'replaceCookie',
            data: {
              name: 'cartId',
              value: cartId,
            },
          }),
        );
      });
    }
    return () => {};
  }, [cartId]);

  useEffect(() => {
    if (window.remote && window.remote.length > 0) {
      window.remote.forEach((r) => {
        r.postMessage(
          JSON.stringify({
            action: 'replaceCookie',
            data: {
              name: 'auth',
              value: auth,
            },
          }),
        );
      });
    }
    return () => {};
  }, [auth]);
  return null;
};

export default useRemoteDomain;
