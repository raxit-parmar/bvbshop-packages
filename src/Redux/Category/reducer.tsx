import _ from 'lodash';

import { deepClone } from '../../Utils';
import { FETCH_CATEGORY_FAIL, FETCH_CATEGORY_RESET, FETCH_CATEGORY_STARTED, FETCH_CATEGORY_SUCCESS } from './actions';

const initialCategoryState: any = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialCategoryState = () => deepClone(initialCategoryState);

export const category = (state = getInitialCategoryState(), action: any) => {
  switch (action.type) {
    case FETCH_CATEGORY_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_CATEGORY_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_CATEGORY_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_CATEGORY_RESET:
      return getInitialCategoryState();
    default:
      return state;
  }
};
