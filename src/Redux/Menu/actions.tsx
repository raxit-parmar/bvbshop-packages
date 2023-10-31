export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_MENU_STARTED = 'FETCH_MENU_STARTED';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAIL = 'FETCH_MENU_FAIL';
export const FETCH_MENU_RESET = 'FETCH_MENU_RESET';

export const fetchMenu = (data: any) => ({
  type: FETCH_MENU,
  payload: data,
});

export const fetchMenuStarted = () => ({
  type: FETCH_MENU_STARTED,
});

export const fetchMenuSuccess = (data: any) => ({
  type: FETCH_MENU_SUCCESS,
  payload: data,
});

export const fetchMenuFail = (error: any) => ({
  type: FETCH_MENU_FAIL,
  payload: error,
});

export const fetchMenuReset = () => ({
  type: FETCH_MENU_RESET,
});
