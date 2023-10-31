export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_STARTED = 'FETCH_CATEGORY_STARTED';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAIL = 'FETCH_CATEGORY_FAIL';
export const FETCH_CATEGORY_RESET = 'FETCH_CATEGORY_RESET';

export const fetchCategory = (data: any = {}) => ({
  type: FETCH_CATEGORY,
  payload: data,
});

export const fetchCategoryStarted = () => ({
  type: FETCH_CATEGORY_STARTED,
});

export const fetchCategorySuccess = (data: any) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: data,
});

export const fetchCategoryFail = (error: any) => ({
  type: FETCH_CATEGORY_FAIL,
  payload: error,
});

export const fetchCategoryReset = () => ({
  type: FETCH_CATEGORY_RESET,
});
