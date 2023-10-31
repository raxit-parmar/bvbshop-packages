import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FETCH_FAQ_FAIL,
  FETCH_FAQ_RESET,
  FETCH_FAQ_STARTED,
  FETCH_FAQ_SUCCESS,
  FETCH_FAQ_DETAIL_SUCCESS,
  FETCH_FAQ_DETAIL_RESET,
} from './actions';

const initialFAQState: any = {
  data: [],
  detail: {},
  error: null,
  isLoading: false,
};

export const getInitialFAQState = () => deepClone(initialFAQState);

export const faq = (state = getInitialFAQState(), action: any) => {
  switch (action.type) {
    case FETCH_FAQ_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_FAQ_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_FAQ_DETAIL_SUCCESS:
      return _.assignIn({}, state, {
        detail: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_FAQ_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_FAQ_RESET:
      return _.assignIn({}, state, {
        data: [],
        error: null,
        isLoading: false,
      });
    case FETCH_FAQ_DETAIL_RESET:
      return _.assignIn({}, state, {
        detail: {},
        error: null,
        isLoading: false,
      });
    default:
      return state;
  }
};
