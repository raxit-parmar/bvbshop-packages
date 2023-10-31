import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  CREATE_RETURN_REPAIR_REQUEST_FAIL,
  CREATE_RETURN_REPAIR_REQUEST_RESET,
  CREATE_RETURN_REPAIR_REQUEST_STARTED,
  CREATE_RETURN_REPAIR_REQUEST_SUCCESS,
  FETCH_RETURN_REPAIR_ORDER_DETAIL_FAIL,
  FETCH_RETURN_REPAIR_ORDER_DETAIL_RESET,
  FETCH_RETURN_REPAIR_ORDER_DETAIL_STARTED,
  FETCH_RETURN_REPAIR_ORDER_DETAIL_SUCCESS,
  FETCH_RETURN_REPAIR_ORDER_FAIL,
  FETCH_RETURN_REPAIR_ORDER_RESET,
  FETCH_RETURN_REPAIR_ORDER_STARTED,
  FETCH_RETURN_REPAIR_ORDER_SUCCESS,
} from './actions';

// List
const initialReturnRepairOrderState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialReturnRepairOrderState = () => deepClone(initialReturnRepairOrderState);

export const returnRepairOrder = (state = getInitialReturnRepairOrderState(), action: any) => {
  switch (action.type) {
    case FETCH_RETURN_REPAIR_ORDER_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_RETURN_REPAIR_ORDER_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_RETURN_REPAIR_ORDER_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_RETURN_REPAIR_ORDER_RESET:
      return getInitialReturnRepairOrderState();
    default:
      return state;
  }
};

// Detail
const initialReturnRepairOrderDetailState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialReturnRepairOrderDetailState = () => deepClone(initialReturnRepairOrderDetailState);

export const returnRepairOrderDetail = (state = getInitialReturnRepairOrderDetailState(), action: any) => {
  switch (action.type) {
    case FETCH_RETURN_REPAIR_ORDER_DETAIL_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_RETURN_REPAIR_ORDER_DETAIL_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_RETURN_REPAIR_ORDER_DETAIL_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_RETURN_REPAIR_ORDER_DETAIL_RESET:
      return getInitialReturnRepairOrderDetailState();
    default:
      return state;
  }
};

// Create
const initialCreateReturnRepairOrderState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialCreateReturnRepairOrderState = () => deepClone(initialCreateReturnRepairOrderState);

export const createReturnRepair = (state = getInitialCreateReturnRepairOrderState(), action: any) => {
  switch (action.type) {
    case CREATE_RETURN_REPAIR_REQUEST_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case CREATE_RETURN_REPAIR_REQUEST_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case CREATE_RETURN_REPAIR_REQUEST_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case CREATE_RETURN_REPAIR_REQUEST_RESET:
      return getInitialCreateReturnRepairOrderState();
    default:
      return state;
  }
};
