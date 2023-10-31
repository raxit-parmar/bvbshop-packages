// Update profile
export const DO_UPDATE_PROFILE = 'DO_UPDATE_PROFILE';
export const DO_UPDATE_PROFILE_STARTED = 'DO_UPDATE_PROFILE_STARTED';
export const DO_UPDATE_PROFILE_SUCCESS = 'DO_UPDATE_PROFILE_SUCCESS';
export const DO_UPDATE_PROFILE_FAIL = 'DO_UPDATE_PROFILE_FAIL';
export const DO_UPDATE_PROFILE_RESET = 'DO_UPDATE_PROFILE_RESET';

export const doUpdateProfile = (data: any = {}) => ({
  type: DO_UPDATE_PROFILE,
  payload: data,
});

export const doUpdateProfileStarted = () => ({
  type: DO_UPDATE_PROFILE_STARTED,
});

export const doUpdateProfileSuccess = (data: any) => ({
  type: DO_UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const doUpdateProfileFail = (error: any) => ({
  type: DO_UPDATE_PROFILE_FAIL,
  payload: error,
});

export const doUpdateProfileReset = () => ({
  type: DO_UPDATE_PROFILE_RESET,
});

// Login user
export const FETCH_LOGIN_USER = 'FETCH_LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_LOGIN_USER_STARTED = 'FETCH_LOGIN_USER_STARTED';
export const FETCH_LOGIN_USER_SUCCESS = 'FETCH_LOGIN_USER_SUCCESS';
export const FETCH_LOGIN_USER_FAIL = 'FETCH_LOGIN_USER_FAIL';
export const FETCH_LOGIN_USER_RESET = 'FETCH_LOGIN_USER_RESET';

export const fetchLoginUser = (data: any = {}) => ({
  type: FETCH_LOGIN_USER,
  payload: data,
});

export const fetchLoginUserStarted = () => ({
  type: FETCH_LOGIN_USER_STARTED,
});

export const fetchLoginUserSuccess = (data: any) => ({
  type: FETCH_LOGIN_USER_SUCCESS,
  payload: data,
});

export const fetchLoginUserFail = (error: any) => ({
  type: FETCH_LOGIN_USER_FAIL,
  payload: error,
});

export const fetchLoginUserReset = () => ({
  type: FETCH_LOGIN_USER_RESET,
});

export const logoutUser = (data: any) => ({
  type: LOGOUT_USER,
  payload: data,
});

// Order history
export const FETCH_USER_ORDERS = 'FETCH_USER_ORDERS';
export const FETCH_USER_ORDERS_STARTED = 'FETCH_USER_ORDERS_STARTED';
export const FETCH_USER_ORDERS_SUCCESS = 'FETCH_USER_ORDERS_SUCCESS';
export const FETCH_USER_ORDERS_FAIL = 'FETCH_USER_ORDERS_FAIL';
export const FETCH_USER_ORDERS_RESET = 'FETCH_USER_ORDERS_RESET';

export const fetchUserOrders = (data: any = {}) => ({
  type: FETCH_USER_ORDERS,
  payload: data,
});

export const fetchUserOrdersStarted = () => ({
  type: FETCH_USER_ORDERS_STARTED,
});

export const fetchUserOrdersSuccess = (data: any) => ({
  type: FETCH_USER_ORDERS_SUCCESS,
  payload: data,
});

export const fetchUserOrdersFail = (error: any) => ({
  type: FETCH_USER_ORDERS_FAIL,
  payload: error,
});

export const fetchUserOrdersReset = () => ({
  type: FETCH_USER_ORDERS_RESET,
});

// Order Detail
export const FETCH_USER_ORDER_DETAIL = 'FETCH_USER_ORDER_DETAIL';
export const FETCH_USER_ORDER_DETAIL_STARTED = 'FETCH_USER_ORDER_DETAIL_STARTED';
export const FETCH_USER_ORDER_DETAIL_SUCCESS = 'FETCH_USER_ORDER_DETAIL_SUCCESS';
export const FETCH_USER_ORDER_DETAIL_FAIL = 'FETCH_USER_ORDER_DETAIL_FAIL';
export const FETCH_USER_ORDER_DETAIL_RESET = 'FETCH_USER_ORDER_DETAIL_RESET';

export const fetchUserOrderDetail = (data: any = {}) => ({
  type: FETCH_USER_ORDER_DETAIL,
  payload: data,
});

export const fetchUserOrderDetailStarted = () => ({
  type: FETCH_USER_ORDER_DETAIL_STARTED,
});

export const fetchUserOrderDetailSuccess = (data: any) => ({
  type: FETCH_USER_ORDER_DETAIL_SUCCESS,
  payload: data,
});

export const fetchUserOrderDetailFail = (error: any) => ({
  type: FETCH_USER_ORDER_DETAIL_FAIL,
  payload: error,
});

export const fetchUserOrderDetailReset = () => ({
  type: FETCH_USER_ORDER_DETAIL_RESET,
});

// Price List
export const FETCH_USER_PRICELIST = 'FETCH_USER_PRICELIST';
export const FETCH_USER_PRICELIST_STARTED = 'FETCH_USER_PRICELIST_STARTED';
export const FETCH_USER_PRICELIST_SUCCESS = 'FETCH_USER_PRICELIST_SUCCESS';
export const FETCH_USER_PRICELIST_FAIL = 'FETCH_USER_PRICELIST_FAIL';
export const FETCH_USER_PRICELIST_RESET = 'FETCH_USER_PRICELIST_RESET';

export const fetchUserPriceList = (data: any = {}) => ({
  type: FETCH_USER_PRICELIST,
  payload: data,
});

export const fetchUserPriceListStarted = () => ({
  type: FETCH_USER_PRICELIST_STARTED,
});

export const fetchUserPriceListSuccess = (data: any) => ({
  type: FETCH_USER_PRICELIST_SUCCESS,
  payload: data,
});

export const fetchUserPriceListFail = (error: any) => ({
  type: FETCH_USER_PRICELIST_FAIL,
  payload: error,
});

export const fetchUserPriceListReset = () => ({
  type: FETCH_USER_PRICELIST_RESET,
});
