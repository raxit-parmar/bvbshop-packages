import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FETCH_CURRENCY_RATE_FAIL,
  FETCH_CURRENCY_RATE_RESET,
  FETCH_CURRENCY_RATE_STARTED,
  FETCH_CURRENCY_RATE_SUCCESS,
} from './actions';

const initialCurrencyRateState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialCurrencyRateState = () => deepClone(initialCurrencyRateState);

export const currencyRate = (state = getInitialCurrencyRateState(), action: any) => {
  switch (action.type) {
    case FETCH_CURRENCY_RATE_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_CURRENCY_RATE_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_CURRENCY_RATE_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_CURRENCY_RATE_RESET:
      return getInitialCurrencyRateState();
    default:
      return state;
  }
};
