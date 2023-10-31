import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FETCH_POST_FAIL,
  FETCH_POST_RESET,
  FETCH_POST_STARTED,
  FETCH_POST_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_RESET,
  FETCH_POSTS_STARTED,
  FETCH_POSTS_SUCCESS,
  FETCH_RELATED_POSTS_RESET,
  FETCH_RELATED_POSTS_FAIL,
  FETCH_RELATED_POSTS_SUCCESS,
  FETCH_RELATED_POSTS_STARTED,
  FETCH_COMMENTS_STARTED,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  FETCH_COMMENTS_RESET,
} from './actions';

const initialPostsState: any = {
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

export const getInitialPostsState = () => deepClone(initialPostsState);

export const posts = (state = getInitialPostsState(), action: any) => {
  switch (action.type) {
    case FETCH_POSTS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_POSTS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_POSTS_FAIL:
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
    case FETCH_POSTS_RESET:
      return getInitialPostsState();
    default:
      return state;
  }
};

const initialPostState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialPostState = () => deepClone(initialPostState);

export const post = (state = getInitialPostState(), action: any) => {
  switch (action.type) {
    case FETCH_POST_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_POST_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_POST_FAIL:
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
    case FETCH_POST_RESET:
      return getInitialPostState();
    default:
      return state;
  }
};

const initialRelatedPostsState: any = {
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

export const getInitialRelatedPostsState = () => deepClone(initialRelatedPostsState);

export const relatedPosts = (state = getInitialRelatedPostsState(), action: any) => {
  switch (action.type) {
    case FETCH_RELATED_POSTS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_RELATED_POSTS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_RELATED_POSTS_FAIL:
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
    case FETCH_RELATED_POSTS_RESET:
      return getInitialRelatedPostsState();
    default:
      return state;
  }
};

const initialCommentsState: any = {
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

export const getInitialCommentsState = () => deepClone(initialCommentsState);

export const comments = (state = getInitialCommentsState(), action: any) => {
  switch (action.type) {
    case FETCH_COMMENTS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_COMMENTS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_COMMENTS_FAIL:
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
    case FETCH_COMMENTS_RESET:
      return getInitialCommentsState();
    default:
      return state;
  }
};
