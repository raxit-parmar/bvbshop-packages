import _ from 'lodash';

import { deepClone } from '../../Utils';
import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_RESET, FETCH_PRODUCTS_STARTED, FETCH_PRODUCTS_SUCCESS } from './actions';

const initialProductsState: any = {
  data: {
    list: [],
    count: null,
    total: null,
    currentPage: null,
    totalPage: null,
  },
  error: null,
  isLoading: false,
};

export const getInitialProductsState = () => deepClone(initialProductsState);

export const products = (state = getInitialProductsState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCTS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCTS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCTS_FAIL:
      return _.assignIn({}, state, {
        // data: {
        //   list: [],
        //   count: null,
        //   total: null,
        //   currentPage: null,
        //   totalPage: null,
        // },
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCTS_RESET:
      return getInitialProductsState();
    default:
      return state;
  }
};
