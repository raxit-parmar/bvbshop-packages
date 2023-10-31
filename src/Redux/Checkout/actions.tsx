// Get checkout detail
export const FETCH_CHECKOUT = 'FETCH_CHECKOUT';
export const SAVE_CHECKOUT_DETAIL = 'SAVE_CHECKOUT_DETAIL';
export const FETCH_CHECKOUT_STARTED = 'FETCH_CHECKOUT_STARTED';
export const FETCH_CHECKOUT_SUCCESS = 'FETCH_CHECKOUT_SUCCESS';
export const FETCH_CHECKOUT_FAIL = 'FETCH_CHECKOUT_FAIL';
export const FETCH_CHECKOUT_RESET = 'FETCH_CHECKOUT_RESET';

export const fetchCheckout = (data: any = {}) => ({
  type: FETCH_CHECKOUT,
  payload: data,
});

export const saveCheckoutDetail = (data: any = {}) => ({
  type: SAVE_CHECKOUT_DETAIL,
  payload: data,
});

export const fetchCheckoutStarted = () => ({
  type: FETCH_CHECKOUT_STARTED,
});

export const fetchCheckoutSuccess = (data: any) => ({
  type: FETCH_CHECKOUT_SUCCESS,
  payload: data,
});

export const fetchCheckoutFail = (error: any) => ({
  type: FETCH_CHECKOUT_FAIL,
  payload: error,
});

export const fetchCheckoutReset = () => ({
  type: FETCH_CHECKOUT_RESET,
});
