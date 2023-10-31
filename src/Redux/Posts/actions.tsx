export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_STARTED = 'FETCH_POSTS_STARTED';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';
export const FETCH_POSTS_RESET = 'FETCH_POSTS_RESET';

export const fetchPosts = (data: any) => ({
  type: FETCH_POSTS,
  payload: data,
});

export const fetchPostsStarted = () => ({
  type: FETCH_POSTS_STARTED,
});

export const fetchPostsSuccess = (data: any) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: data,
});

export const fetchPostsFail = (error: any) => ({
  type: FETCH_POSTS_FAIL,
  payload: error,
});

export const fetchPostsReset = () => ({
  type: FETCH_POSTS_RESET,
});

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_STARTED = 'FETCH_POST_STARTED';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAIL = 'FETCH_POST_FAIL';
export const FETCH_POST_RESET = 'FETCH_POST_RESET';

export const fetchPost = (data: any) => ({
  type: FETCH_POST,
  payload: data,
});

export const fetchPostStarted = () => ({
  type: FETCH_POST_STARTED,
});

export const fetchPostSuccess = (data: any) => ({
  type: FETCH_POST_SUCCESS,
  payload: data,
});

export const fetchPostFail = (error: any) => ({
  type: FETCH_POST_FAIL,
  payload: error,
});

export const fetchPostReset = () => ({
  type: FETCH_POST_RESET,
});

export const FETCH_RELATED_POSTS = 'FETCH_RELATED_POSTS';
export const FETCH_RELATED_POSTS_STARTED = 'FETCH_RELATED_POSTS_STARTED';
export const FETCH_RELATED_POSTS_SUCCESS = 'FETCH_RELATED_POSTS_SUCCESS';
export const FETCH_RELATED_POSTS_FAIL = 'FETCH_RELATED_POSTS_FAIL';
export const FETCH_RELATED_POSTS_RESET = 'FETCH_RELATED_POSTS_RESET';

export const fetchRelatedPosts = (data: any) => ({
  type: FETCH_RELATED_POSTS,
  payload: data,
});

export const fetchRelatedPostsStarted = () => ({
  type: FETCH_RELATED_POSTS_STARTED,
});

export const fetchRelatedPostsSuccess = (data: any) => ({
  type: FETCH_RELATED_POSTS_SUCCESS,
  payload: data,
});

export const fetchRelatedPostsFail = (error: any) => ({
  type: FETCH_RELATED_POSTS_FAIL,
  payload: error,
});

export const fetchRelatedPostsReset = () => ({
  type: FETCH_RELATED_POSTS_RESET,
});

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_STARTED = 'FETCH_COMMENTS_STARTED';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAIL = 'FETCH_COMMENTS_FAIL';
export const FETCH_COMMENTS_RESET = 'FETCH_COMMENTS_RESET';

export const fetchComments = (data: any) => ({
  type: FETCH_COMMENTS,
  payload: data,
});

export const fetchCommentsStarted = () => ({
  type: FETCH_COMMENTS_STARTED,
});

export const fetchCommentsSuccess = (data: any) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: data,
});

export const fetchCommentsFail = (error: any) => ({
  type: FETCH_COMMENTS_FAIL,
  payload: error,
});

export const fetchCommentsReset = () => ({
  type: FETCH_COMMENTS_RESET,
});
