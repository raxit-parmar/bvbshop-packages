export const FETCH_CMS_DETAIL = 'FETCH_CMS_DETAIL';
export const FETCH_CMS_DETAIL_STARTED = 'FETCH_CMS_DETAIL_STARTED';
export const FETCH_CMS_DETAIL_SUCCESS = 'FETCH_CMS_DETAIL_SUCCESS';
export const FETCH_CMS_DETAIL_FAIL = 'FETCH_CMS_DETAIL_FAIL';
export const FETCH_CMS_DETAIL_RESET = 'FETCH_CMS_DETAIL_RESET';

export const fetchCMSDetail = (data: any = {}) => ({
  type: FETCH_CMS_DETAIL,
  payload: data,
});

export const fetchCMSDetailStarted = () => ({
  type: FETCH_CMS_DETAIL_STARTED,
});

export const fetchCMSDetailSuccess = (data: any) => ({
  type: FETCH_CMS_DETAIL_SUCCESS,
  payload: data,
});

export const fetchCMSDetailFail = (error: any) => ({
  type: FETCH_CMS_DETAIL_FAIL,
  payload: error,
});

export const fetchCMSDetailReset = () => ({
  type: FETCH_CMS_DETAIL_RESET,
});
