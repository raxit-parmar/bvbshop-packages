import _ from 'lodash';

import { deepClone } from '../../Utils';
import { FETCH_CHECKOUT_FAIL, FETCH_CHECKOUT_RESET, FETCH_CHECKOUT_STARTED, FETCH_CHECKOUT_SUCCESS } from './actions';

const initialCheckoutState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialCheckoutState = () => deepClone(initialCheckoutState);

export const checkout = (state = getInitialCheckoutState(), action: any) => {
  switch (action.type) {
    case FETCH_CHECKOUT_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_CHECKOUT_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_CHECKOUT_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_CHECKOUT_RESET:
      return getInitialCheckoutState();
    default:
      return state;
  }
};
