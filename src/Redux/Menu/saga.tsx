import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_MENU, fetchMenuFail, fetchMenuStarted, fetchMenuSuccess } from './actions';
import { getMenu } from './api';

export function* sagaFetchMenu(action: any) {
  yield put(fetchMenuStarted());
  try {
    const data = yield getMenu(action.payload);
    yield put(fetchMenuSuccess(data));
  } catch (e) {
    yield put(fetchMenuFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_MENU, sagaFetchMenu);
}
