import { put, takeEvery } from 'redux-saga/effects';
import {
  fetchBlogFail,
  fetchBlogsFail,
  fetchBlogsStarted,
  fetchBlogsSuccess,
  fetchBlogStarted,
  fetchBlogSuccess,
  FETCH_BLOG,
  FETCH_BLOGS,
} from './actions';
import { getBlogDetail, getBlogs } from './api';

export function* sagaFetchBlogs(action: any) {
  yield put(fetchBlogsStarted());
  try {
    const blogs = yield getBlogs(action.payload);
    yield put(fetchBlogsSuccess(blogs));
  } catch (e) {
    yield put(fetchBlogsFail(e.message));
  }
}

export function* sagaFetchBlog(action: any) {
  yield put(fetchBlogStarted());
  try {
    const blog = yield getBlogDetail(action.payload);
    yield put(fetchBlogSuccess(blog));
  } catch (e) {
    yield put(fetchBlogFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_BLOGS, sagaFetchBlogs);
  yield takeEvery(FETCH_BLOG, sagaFetchBlog);
}
