import { put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_POST,
  FETCH_POSTS,
  FETCH_RELATED_POSTS,
  fetchPostFail,
  fetchPostsFail,
  fetchPostsStarted,
  fetchPostsSuccess,
  fetchPostStarted,
  fetchPostSuccess,
  fetchRelatedPostsFail,
  fetchRelatedPostsStarted,
  fetchRelatedPostsSuccess,
  fetchCommentsStarted,
  fetchCommentsSuccess,
  fetchCommentsFail,
  FETCH_COMMENTS,
} from './actions';
import { getPostDetail, getPosts, getRelatedPosts, getComments } from './api';

export function* sagaFetchPosts(action: any) {
  yield put(fetchPostsStarted());
  try {
    const posts = yield getPosts(action.payload);
    yield put(fetchPostsSuccess(posts));
  } catch (e) {
    yield put(fetchPostsFail(e.message));
  }
}

export function* sagaFetchPost(action: any) {
  yield put(fetchPostStarted());
  try {
    const post = yield getPostDetail(action.payload);
    yield put(fetchPostSuccess(post));
  } catch (e) {
    yield put(fetchPostFail(e.message));
  }
}

export function* sagaFetchRelatedPosts(action: any) {
  yield put(fetchRelatedPostsStarted());
  try {
    const relatedPosts = yield getRelatedPosts(action.payload);
    yield put(fetchRelatedPostsSuccess(relatedPosts));
  } catch (e) {
    yield put(fetchRelatedPostsFail(e.message));
  }
}

export function* sagaFetchComments(action: any) {
  yield put(fetchCommentsStarted());
  try {
    const relatedPosts = yield getComments(action.payload);
    yield put(fetchCommentsSuccess(relatedPosts));
  } catch (e) {
    yield put(fetchCommentsFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_POSTS, sagaFetchPosts);
  yield takeEvery(FETCH_POST, sagaFetchPost);
  yield takeEvery(FETCH_RELATED_POSTS, sagaFetchRelatedPosts);
  yield takeEvery(FETCH_COMMENTS, sagaFetchComments);
}
