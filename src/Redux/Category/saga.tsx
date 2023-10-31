import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_CATEGORY, fetchCategoryFail, fetchCategoryStarted, fetchCategorySuccess } from './actions';
import { getCategory } from './api';

export function* sagaFetchCategory(action: any) {
  yield put(fetchCategoryStarted());
  try {
    const data = yield getCategory(action.payload);
    yield put(fetchCategorySuccess(data));
  } catch (e) {
    yield put(fetchCategoryFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_CATEGORY, sagaFetchCategory);
}
