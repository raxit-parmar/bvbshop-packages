export const FETCH_FAQ = 'FETCH_FAQ';
export const FETCH_FAQ_DETAIL = 'FETCH_FAQ_DETAIL';
export const FETCH_FAQ_STARTED = 'FETCH_FAQ_STARTED';
export const FETCH_FAQ_SUCCESS = 'FETCH_FAQ_SUCCESS';
export const FETCH_FAQ_DETAIL_SUCCESS = 'FETCH_FAQ_DETAIL_SUCCESS';
export const FETCH_FAQ_FAIL = 'FETCH_FAQ_FAIL';
export const FETCH_FAQ_RESET = 'FETCH_FAQ_RESET';
export const FETCH_FAQ_DETAIL_RESET = 'FETCH_FAQ_DETAIL_RESET';

export const fetchFAQ = (data: any) => ({
  type: FETCH_FAQ,
  payload: data,
});

export const fetchFAQDetail = (data: any) => ({
  type: FETCH_FAQ_DETAIL,
  payload: data,
});

export const fetchFAQStarted = () => ({
  type: FETCH_FAQ_STARTED,
});

export const fetchFAQSuccess = (data: any) => ({
  type: FETCH_FAQ_SUCCESS,
  payload: data,
});

export const fetchFAQDetailSuccess = (data: any) => ({
  type: FETCH_FAQ_DETAIL_SUCCESS,
  payload: data,
});

export const fetchFAQFail = (error: any) => ({
  type: FETCH_FAQ_FAIL,
  payload: error,
});

export const fetchFAQReset = () => ({
  type: FETCH_FAQ_RESET,
});

export const fetchFAQDetailReset = () => ({
  type: FETCH_FAQ_DETAIL_RESET,
});
