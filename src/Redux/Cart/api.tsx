import { fetch } from '../../Utils';

export const getCart = async ({ cartId = 0, queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/cart/${cartId}`, {
    queryParams,
    apiInstance,
  });
};

export const addItem = async ({ cartId = 0, payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/cart/${cartId}/item`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const updateItem = async ({ cartId = 0, payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/cart/${cartId}/item`, {
    method: 'PUT',
    body: payload,
    apiInstance,
  });
};

export const removeItem = async ({ cartId = 0, itemId = 0, apiInstance = null }): Promise<any> => {
  return await fetch(`/cart/${cartId}/item/${itemId}`, {
    method: 'DELETE',
    apiInstance,
  });
};

export const applyCoupon = async ({ cartId = 0, payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/cart/${cartId}/applyCoupon`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const getCartRelatedProducts = async ({ cartId = 0, apiInstance = null }): Promise<any> => {
  return await fetch(`/cart/${cartId}/relatedItem`, {
    apiInstance,
  });
};

export const getReNewCart = async ({ cartId = 0, queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/cart/${cartId}/reNew`, {
    queryParams,
    apiInstance,
  });
};
