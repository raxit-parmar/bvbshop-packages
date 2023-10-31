export const SEARCH_CHANGE_PAGE = 'SEARCH_CHANGE_PAGE';
export const SEARCH_CHANGE_SORT = 'SEARCH_CHANGE_SORT';
export const SEARCH_QUERY = 'SEARCH_QUERY';
export const SEARCH_CHANGE_PRICE = 'SEARCH_CHANGE_PRICE';
export const SEARCH_CHANGE_ATTRIBUTES = 'SEARCH_CHANGE_ATTRIBUTES';
export const SEARCH_CHANGE_SLIDER_ATTRIBUTES = 'SEARCH_CHANGE_SLIDER_ATTRIBUTES';
export const SEARCH_RESET = 'SEARCH_RESET';
export const SEARCH_REPLACE = 'SEARCH_REPLACE';

export const searchChangePage = (payload: any) => ({
  payload,
  type: SEARCH_CHANGE_PAGE,
});

export const searchChangeSort = (payload: any) => ({
  payload,
  type: SEARCH_CHANGE_SORT,
});

export const searchQuery = (payload: any) => ({
  payload,
  type: SEARCH_QUERY,
});

export const searchChangePrice = (payload: any) => ({
  payload,
  type: SEARCH_CHANGE_PRICE,
});

export const searchChangeAttributes = (payload: any) => ({
  payload,
  type: SEARCH_CHANGE_ATTRIBUTES,
});

export const searchChangeSliderAttributes = (payload: any) => ({
  payload,
  type: SEARCH_CHANGE_SLIDER_ATTRIBUTES,
});

export const searchReplace = (payload: any) => ({
  payload,
  type: SEARCH_REPLACE,
});

export const searchReset = () => ({
  type: SEARCH_RESET,
});
