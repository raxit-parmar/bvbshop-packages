import { put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_FAQ,
  fetchFAQFail,
  fetchFAQStarted,
  fetchFAQSuccess,
  fetchFAQDetailSuccess,
  FETCH_FAQ_DETAIL,
} from './actions';
import { getAllFAQ, getFAQDetail } from './api';

export function* sagaFetchFAQ() {
  yield put(fetchFAQStarted());
  try {
    const data = yield getAllFAQ({});
    yield put(fetchFAQSuccess(data));
  } catch (e) {
    yield put(fetchFAQFail(e.message));
  }
}

export function* sagaFetchFAQDetail(action: any) {
  yield put(fetchFAQStarted());
  try {
    const data = yield getFAQDetail(action.payload);
    yield put(fetchFAQDetailSuccess(data));
  } catch (e) {
    yield put(fetchFAQFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_FAQ, sagaFetchFAQ);
  yield takeEvery(FETCH_FAQ_DETAIL, sagaFetchFAQDetail);
}
