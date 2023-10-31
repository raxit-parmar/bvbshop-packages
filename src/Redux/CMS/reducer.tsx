import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FETCH_CMS_DETAIL_FAIL,
  FETCH_CMS_DETAIL_RESET,
  FETCH_CMS_DETAIL_STARTED,
  FETCH_CMS_DETAIL_SUCCESS,
} from './actions';

const initialCMSDetailState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialCMSDetailState = () => deepClone(initialCMSDetailState);

export const CMSDetail = (state = getInitialCMSDetailState(), action: any) => {
  switch (action.type) {
    case FETCH_CMS_DETAIL_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_CMS_DETAIL_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_CMS_DETAIL_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_CMS_DETAIL_RESET:
      return getInitialCMSDetailState();
    default:
      return state;
  }
};
