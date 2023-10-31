import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FETCH_BLOG_FAIL,
  FETCH_BLOG_RESET,
  FETCH_BLOG_STARTED,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_RESET,
  FETCH_BLOGS_STARTED,
  FETCH_BLOGS_SUCCESS,
} from './actions';

const initialBlogsState: any = {
  data: {
    list: [],
    count: null,
    total: null,
    currentPage: null,
    totalPage: null,
  },
  error: null,
  isLoading: false,
};

export const getInitialBlogsState = () => deepClone(initialBlogsState);

export const blogs = (state = getInitialBlogsState(), action: any) => {
  switch (action.type) {
    case FETCH_BLOGS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_BLOGS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_BLOGS_FAIL:
      return _.assignIn({}, state, {
        // data: {
        //   list: [],
        //   count: null,
        //   total: null,
        //   currentPage: null,
        //   totalPage: null,
        // },
        error: action.payload,
        isLoading: false,
      });
    case FETCH_BLOGS_RESET:
      return getInitialBlogsState();
    default:
      return state;
  }
};

const initialBlogState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialBlogState = () => deepClone(initialBlogState);

export const blog = (state = getInitialBlogState(), action: any) => {
  switch (action.type) {
    case FETCH_BLOG_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_BLOG_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_BLOG_FAIL:
      return _.assignIn({}, state, {
        // data: {
        //   list: [],
        //   count: null,
        //   total: null,
        //   currentPage: null,
        //   totalPage: null,
        // },
        error: action.payload,
        isLoading: false,
      });
    case FETCH_BLOG_RESET:
      return getInitialBlogState();
    default:
      return state;
  }
};
