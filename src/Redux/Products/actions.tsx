export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_STARTED = 'FETCH_PRODUCTS_STARTED';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';
export const FETCH_PRODUCTS_RESET = 'FETCH_PRODUCTS_RESET';

export const fetchProducts = (data: any) => ({
  type: FETCH_PRODUCTS,
  payload: data,
});

export const fetchProductsStarted = () => ({
  type: FETCH_PRODUCTS_STARTED,
});

export const fetchProductsSuccess = (data: any) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchProductsFail = (error: any) => ({
  type: FETCH_PRODUCTS_FAIL,
  payload: error,
});

export const fetchProductsReset = () => ({
  type: FETCH_PRODUCTS_RESET,
});
