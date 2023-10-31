import { fetch } from '../../Utils';

export const saveShoppingCart = async ({ payload = {} }): Promise<any> => {
  return await fetch('/saveCart/saveShoppingCart', {
    method: 'POST',
    body: payload,
  });
};

export const restoreCart = async ({ payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch('/saveCart/restoreCart', {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};
