import _ from 'lodash';

import { deepClone } from '../../Utils';
import { UPDATE_ROUTE } from './action';

const initialRouteState: any = {
  path: '',
  name: '',
  url: '',
  params: {},
  queryParam: {},
  isExact: false,
  history: [],
};

export const getInitialRouteState = () => deepClone(initialRouteState);

export const route = (state = getInitialRouteState(), action: any) => {
  switch (action.type) {
    case UPDATE_ROUTE:
      if (!state.history) {
        state.history = [];
      }
      // Initial request don't have history
      if (!!state.path) {
        const prevState = deepClone(state);
        delete prevState.history;
        try {
          state.history = [...state.history, prevState];
        } catch (e) {
          console.log(e);
        }
      }
      if (
        action &&
        action.payload &&
        action.payload.queryParam &&
        typeof action.payload.queryParam === 'object' &&
        Object.keys(action.payload.queryParam).length > 0
      ) {
        const queryParam = {};
        Object.keys(action.payload.queryParam).forEach((q) => {
          queryParam[encodeURIComponent(q)] = encodeURIComponent(action.payload.queryParam[q]);
        });
        action.payload.queryParam = queryParam;
      }
      return _.assignIn({}, state, action.payload);
    default:
      return state;
  }
};
