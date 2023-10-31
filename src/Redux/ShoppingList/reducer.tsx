import _ from 'lodash';
import { deepClone } from '../../Utils';
import {
  FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS,
  FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS,
  FETCH_SHOPPING_LIST_CREATE_SUCCESS,
  FETCH_SHOPPING_LIST_DELETE_SUCCESS,
  FETCH_SHOPPING_LIST_DETAIL_FAIL,
  FETCH_SHOPPING_LIST_DETAIL_RESET,
  FETCH_SHOPPING_LIST_DETAIL_STARTED,
  FETCH_SHOPPING_LIST_DETAIL_SUCCESS,
  FETCH_SHOPPING_LIST_FAIL,
  FETCH_SHOPPING_LIST_RESET,
  FETCH_SHOPPING_LIST_STARTED,
  FETCH_SHOPPING_LIST_SUCCESS,
  FETCH_SHOPPING_LIST_UPDATE_SUCCESS,
  FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS,
} from './actions';

const initialShoppingListState: any = {
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

export const getInitialShoppingListState = () => deepClone(initialShoppingListState);

export const shoppingList = (state = getInitialShoppingListState(), action: any) => {
  switch (action.type) {
    case FETCH_SHOPPING_LIST_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_SHOPPING_LIST_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_SHOPPING_LIST_CREATE_SUCCESS:
      //   TODO:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_SHOPPING_LIST_UPDATE_SUCCESS:
      //   TODO:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_SHOPPING_LIST_DELETE_SUCCESS:
      const tempData = deepClone(state.data);
      tempData.list = tempData.list.filter((t) => t.id !== action.payload.shoppingListId);
      return _.assignIn({}, state, {
        data: tempData,
        error: null,
        isLoading: false,
      });
    case FETCH_SHOPPING_LIST_FAIL:
      return _.assignIn({}, state, {
        error: action.payload,
        isLoading: false,
      });
    case FETCH_SHOPPING_LIST_RESET:
      return getInitialShoppingListState();
    default:
      return state;
  }
};

const initialShoppingListDetailState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialShoppingListDetailState = () => deepClone(initialShoppingListDetailState);

export const shoppingListDetail = (state = getInitialShoppingListState(), action: any) => {
  switch (action.type) {
    case FETCH_SHOPPING_LIST_DETAIL_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_SHOPPING_LIST_DETAIL_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS:
      //   TODO:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS:
      //   TODO:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS:
      const stateData = deepClone(state.data);
      stateData.products = stateData.products.filter((p) => p.itemHash !== action.payload.productId);
      return _.assignIn({}, state, {
        data: stateData,
        error: null,
        isLoading: false,
      });
    case FETCH_SHOPPING_LIST_DETAIL_FAIL:
      return _.assignIn({}, state, {
        error: action.payload,
        isLoading: false,
      });
    case FETCH_SHOPPING_LIST_DETAIL_RESET:
      return getInitialShoppingListDetailState();
    default:
      return state;
  }
};
