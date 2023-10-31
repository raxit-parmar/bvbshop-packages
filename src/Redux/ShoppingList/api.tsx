import { fetch } from '../../Utils';

export const getAllShoppingList = async ({ queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/shoppingList`, {
    queryParams,
    apiInstance,
  });
};

export const getShoppingListDetail = async ({
  shoppingListId = 0,
  queryParams = {},
  apiInstance = null,
}): Promise<any> => {
  return await fetch(`/shoppingList/${shoppingListId}`, {
    queryParams,
    apiInstance,
  });
};

export const createShoppingList = async ({ payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/shoppingList`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const updateShoppingList = async ({ shoppingListId = 0, payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/shoppingList/${shoppingListId}`, {
    method: 'PUT',
    body: payload,
    apiInstance,
  });
};

export const deleteShoppingList = async ({ shoppingListId = 0, apiInstance = null }): Promise<any> => {
  return await fetch(`/shoppingList/${shoppingListId}`, {
    method: 'DELETE',
    apiInstance,
  });
};

export const addProductToShoppingList = async ({
  shoppingListId = 0,
  queryParams = {},
  payload = {},
  apiInstance = null,
}): Promise<any> => {
  return await fetch(`/shoppingList/${shoppingListId}/product`, {
    method: 'POST',
    body: payload,
    queryParams,
    apiInstance,
  });
};

export const updateProductToShoppingList = async ({
  shoppingListId = 0,
  queryParams = {},
  payload = {},
  apiInstance = null,
}): Promise<any> => {
  return await fetch(`/shoppingList/${shoppingListId}/product`, {
    method: 'PUT',
    body: payload,
    queryParams,
    apiInstance,
  });
};

export const deleteProductToShoppingList = async ({
  shoppingListId = 0,
  productId = 0,
  queryParams = {},
  apiInstance = null,
}): Promise<any> => {
  return await fetch(`/shoppingList/${shoppingListId}/product/${productId}`, {
    method: 'DELETE',
    queryParams,
    apiInstance,
  });
};

export const addAllShoppingListProductsToCart = async ({
  shoppingListId = 0,
  queryParams = {},
  payload = {},
  apiInstance = null,
}): Promise<any> => {
  return await fetch(`/shoppingList/${shoppingListId}/addToCart`, {
    method: 'POST',
    body: payload,
    queryParams,
    apiInstance,
  });
};
