import { deepClone, removeEmpty } from '../../Utils';
import _ from 'lodash';

import {
  SEARCH_CHANGE_ATTRIBUTES,
  SEARCH_CHANGE_PAGE,
  SEARCH_CHANGE_PRICE,
  SEARCH_CHANGE_SLIDER_ATTRIBUTES,
  SEARCH_CHANGE_SORT,
  SEARCH_QUERY,
  SEARCH_REPLACE,
  SEARCH_RESET,
} from './actions';

export interface SearchObject {
  [key: string]: any;
  page?: number;
  q?: string;
  sort?: string;
  attributes?: any;
  categoryId?: any;
  price?: {
    from?: number | string;
    to?: number | string;
  };
}

const initialSearchState: SearchObject = {
  page: null,
  q: '',
  sort: null,
  categoryId: null,
  manufacturerId: null,
  attributes: {},
  price: {
    from: '',
    to: '',
  },
};

export const getInitialSearchState = () => deepClone(initialSearchState);

export const search = (state = getInitialSearchState(), action: any) => {
  switch (action.type) {
    case SEARCH_CHANGE_PAGE:
      return _.assignIn({}, state, {
        page: action.payload.toString(),
      });
    case SEARCH_CHANGE_SORT:
      return _.assignIn({}, state, {
        page: '1',
        sort: action.payload,
      });
    case SEARCH_CHANGE_PRICE:
      return _.assignIn({}, state, {
        page: '1',
        price: action.payload,
      });
    case SEARCH_CHANGE_ATTRIBUTES:
      let attributes = state.attributes || {};
      const type = action.payload.type || 'checkbox';
      if (attributes[action.payload.parent] && type === 'checkbox') {
        const childKey = attributes[action.payload.parent].indexOf(action.payload.child);
        if (action.payload.checked && childKey === -1) {
          attributes[action.payload.parent].push(action.payload.child);
        } else if (!action.payload.checked && childKey !== -1) {
          attributes[action.payload.parent].splice(childKey, 1);
          attributes = removeEmpty(attributes);
        }
      } else if (action.payload.parent && type === 'radio') {
        if (action.payload.checked) {
          attributes[action.payload.parent] = [action.payload.child];
        } else if (!action.payload.checked) {
          delete attributes[action.payload.parent];
        }
      } else if (action.payload.checked) {
        attributes[action.payload.parent] = [action.payload.child];
      }
      return _.assignIn({}, state, {
        page: '1',
        attributes,
      });
    case SEARCH_CHANGE_SLIDER_ATTRIBUTES:
      let sliderAttribute = state.attributes || {};
      sliderAttribute[action.payload.parent] = [action.payload.value];
      sliderAttribute = removeEmpty(sliderAttribute);
      return _.assignIn({}, state, {
        page: '1',
        attributes: sliderAttribute,
      });
    case SEARCH_QUERY:
      return _.assignIn({}, state, {
        attributes: {},
        categoryId: null,
        manufacturerId: null,
        q: action.payload,
        page: '1',
        sort: null,
        price: {
          from: '',
          to: '',
        },
      });
    case SEARCH_REPLACE:
      return _.assignIn({}, action.payload);
    case SEARCH_RESET:
      return getInitialSearchState();
    default:
      return state;
  }
};
