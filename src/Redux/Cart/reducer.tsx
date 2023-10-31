import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  CART_FAIL,
  CART_PROCESS_STARTED,
  CART_RESET,
  CART_SUCCESS,
  FETCH_CART_RELATED_PRODUCTS_FAIL,
  FETCH_CART_RELATED_PRODUCTS_RESET,
  FETCH_CART_RELATED_PRODUCTS_STARTED,
  FETCH_CART_RELATED_PRODUCTS_SUCCESS,
} from './actions';

const initialCartState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialCartState = () => deepClone(initialCartState);

export const cart = (state = getInitialCartState(), action: any) => {
  switch (action.type) {
    case CART_PROCESS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case CART_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case CART_FAIL:
      return _.assignIn({}, state, {
        error: action.payload,
        isLoading: false,
      });
    case CART_RESET:
      return getInitialCartState();
    default:
      return state;
  }
};

// Related Product
const initialCartRelatedProductsState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialCartRelatedProductsState = () => deepClone(initialCartRelatedProductsState);

export const cartRelatedProducts = (state = getInitialCartRelatedProductsState(), action: any) => {
  switch (action.type) {
    case FETCH_CART_RELATED_PRODUCTS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_CART_RELATED_PRODUCTS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_CART_RELATED_PRODUCTS_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_CART_RELATED_PRODUCTS_RESET:
      return getInitialCartRelatedProductsState();
    default:
      return state;
  }
};
