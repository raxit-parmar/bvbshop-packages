import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FETCH_MANUFACTURER_FAIL,
  FETCH_MANUFACTURER_RESET,
  FETCH_MANUFACTURER_STARTED,
  FETCH_MANUFACTURER_SUCCESS,
} from './actions';

const initialManufacturerState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialManufacturerState = () => deepClone(initialManufacturerState);

export const manufacturer = (state = getInitialManufacturerState(), action: any) => {
  switch (action.type) {
    case FETCH_MANUFACTURER_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_MANUFACTURER_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_MANUFACTURER_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_MANUFACTURER_RESET:
      return getInitialManufacturerState();
    default:
      return state;
  }
};
