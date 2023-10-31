import _ from 'lodash';
import { deepClone } from '../../Utils';
import { FETCH_SETTINGS_SUCCESS, FETCH_WEBWINKELKEUR_SUCCESS } from './actions';

const initialSettingsState: any = {
  webWinkelkeur: {},
  settings: {},
};

export const getInitialSettingsState = () => deepClone(initialSettingsState);

export const settings = (state = getInitialSettingsState(), action: any) => {
  switch (action.type) {
    case FETCH_WEBWINKELKEUR_SUCCESS:
      return _.assignIn({}, state, {
        webWinkelkeur: action.payload,
      });
    case FETCH_SETTINGS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
      });
    default:
      return state;
  }
};
