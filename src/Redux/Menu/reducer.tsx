import _ from 'lodash';

import { deepClone } from '../../Utils';
import { FETCH_MENU_FAIL, FETCH_MENU_RESET, FETCH_MENU_STARTED, FETCH_MENU_SUCCESS } from './actions';

const initialMenuState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialMenuState = () => deepClone(initialMenuState);

export const menu = (state = getInitialMenuState(), action: any) => {
  switch (action.type) {
    case FETCH_MENU_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_MENU_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_MENU_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_MENU_RESET:
      return getInitialMenuState();
    default:
      return state;
  }
};
