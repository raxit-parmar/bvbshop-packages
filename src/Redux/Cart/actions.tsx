export const FETCH_CART = 'FETCH_CART';
export const CART_PROCESS_STARTED = 'CART_PROCESS_STARTED';
export const CART_SUCCESS = 'CART_SUCCESS';
export const CART_FAIL = 'CART_FAIL';
export const CART_RESET = 'CART_RESET';

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

export const UPDATE_CART = 'UPDATE_CART';

export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

export const APPLY_COUPON_CODE = 'APPLY_COUPON_CODE';

export const fetchCart = (data: any) => ({
  type: FETCH_CART,
  payload: data,
});

export const cartProcessStarted = () => ({
  type: CART_PROCESS_STARTED,
});

export const cartSuccess = (data: any) => ({
  type: CART_SUCCESS,
  payload: data,
});

export const cartFail = (error: any) => ({
  type: CART_FAIL,
  payload: error,
});

export const cartReset = () => ({
  type: CART_RESET,
});

export const addItemToCart = (data: any) => ({
  type: ADD_ITEM_TO_CART,
  payload: data,
});

export const updateCart = (data: any) => ({
  type: UPDATE_CART,
  payload: data,
});

export const removeItemFromCart = (data: any) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: data,
});

export const applyCouponCode = (data: any) => ({
  type: APPLY_COUPON_CODE,
  payload: data,
});

// Cart Related Products
export const FETCH_CART_RELATED_PRODUCTS = 'FETCH_CART_RELATED_PRODUCTS';
export const FETCH_CART_RELATED_PRODUCTS_STARTED = 'FETCH_CART_RELATED_PRODUCTS_STARTED';
export const FETCH_CART_RELATED_PRODUCTS_SUCCESS = 'FETCH_CART_RELATED_PRODUCTS_SUCCESS';
export const FETCH_CART_RELATED_PRODUCTS_FAIL = 'FETCH_CART_RELATED_PRODUCTS_FAIL';
export const FETCH_CART_RELATED_PRODUCTS_RESET = 'FETCH_CART_RELATED_PRODUCTS_RESET';

export const fetchCartRelatedProducts = (data: any) => ({
  type: FETCH_CART_RELATED_PRODUCTS,
  payload: data,
});

export const fetchCartRelatedProductsStarted = () => ({
  type: FETCH_CART_RELATED_PRODUCTS_STARTED,
});

export const fetchCartRelatedProductsSuccess = (data: any) => ({
  type: FETCH_CART_RELATED_PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchCartRelatedProductsFail = (error: any) => ({
  type: FETCH_CART_RELATED_PRODUCTS_FAIL,
  payload: error,
});

export const fetchCartRelatedProductsReset = () => ({
  type: FETCH_CART_RELATED_PRODUCTS_RESET,
});
