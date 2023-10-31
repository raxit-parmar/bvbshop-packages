import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  DO_UPDATE_PROFILE_FAIL,
  DO_UPDATE_PROFILE_RESET,
  DO_UPDATE_PROFILE_STARTED,
  DO_UPDATE_PROFILE_SUCCESS,
  FETCH_LOGIN_USER_FAIL,
  FETCH_LOGIN_USER_RESET,
  FETCH_LOGIN_USER_STARTED,
  FETCH_LOGIN_USER_SUCCESS,
  FETCH_USER_ORDER_DETAIL_FAIL,
  FETCH_USER_ORDER_DETAIL_RESET,
  FETCH_USER_ORDER_DETAIL_STARTED,
  FETCH_USER_ORDER_DETAIL_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  FETCH_USER_ORDERS_RESET,
  FETCH_USER_ORDERS_STARTED,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_PRICELIST_STARTED,
  FETCH_USER_PRICELIST_SUCCESS,
  FETCH_USER_PRICELIST_FAIL,
  FETCH_USER_PRICELIST_RESET,
} from './actions';

const initialUpdateProfileState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialUpdateProfileState = () => deepClone(initialUpdateProfileState);

export const updateProfile = (state = getInitialUpdateProfileState(), action: any) => {
  switch (action.type) {
    case DO_UPDATE_PROFILE_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case DO_UPDATE_PROFILE_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case DO_UPDATE_PROFILE_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case DO_UPDATE_PROFILE_RESET:
      return getInitialUpdateProfileState();
    default:
      return state;
  }
};

const initialLoginUserState: {
  data?: {
    accessToken?: string;
    user?: any;
  };
  isLogin?: boolean;
  error?: string;
  isLoading?: boolean;
} = {
  data: {},
  isLogin: false,
  error: null,
  isLoading: false,
};

export const getInitialLoginUserState = () => deepClone(initialLoginUserState);

export const loginUser = (state = getInitialLoginUserState(), action: any) => {
  switch (action.type) {
    case FETCH_LOGIN_USER_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_LOGIN_USER_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
        isLogin: true,
      });
    case FETCH_LOGIN_USER_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_LOGIN_USER_RESET:
      return getInitialLoginUserState();
    default:
      return state;
  }
};

const initialUserOrdersState = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialUserOrdersState = () => deepClone(initialUserOrdersState);

export const userOrders = (state = getInitialUserOrdersState(), action: any) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_USER_ORDERS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_USER_ORDERS_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_USER_ORDERS_RESET:
      return getInitialUserOrdersState();
    default:
      return state;
  }
};

const initialUserOrderDetailState = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialUserOrderDetailState = () => deepClone(initialUserOrderDetailState);

export const userOrderDetail = (state = getInitialUserOrderDetailState(), action: any) => {
  switch (action.type) {
    case FETCH_USER_ORDER_DETAIL_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_USER_ORDER_DETAIL_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_USER_ORDER_DETAIL_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_USER_ORDER_DETAIL_RESET:
      return getInitialUserOrderDetailState();
    default:
      return state;
  }
};

const initialUserPriceListState = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialUserPriceListState = () => deepClone(initialUserPriceListState);

export const userPriceList = (state = getInitialUserPriceListState(), action: any) => {
  switch (action.type) {
    case FETCH_USER_PRICELIST_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_USER_PRICELIST_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_USER_PRICELIST_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_USER_PRICELIST_RESET:
      return getInitialUserPriceListState();
    default:
      return state;
  }
};
