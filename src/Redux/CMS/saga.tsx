import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_CMS_DETAIL, fetchCMSDetailFail, fetchCMSDetailStarted, fetchCMSDetailSuccess } from './actions';
import { getCMSDetail } from './api';

export function* sagaFetchCMSDetail(action: any) {
  yield put(fetchCMSDetailStarted());
  try {
    const data = yield getCMSDetail(action.payload);
    yield put(fetchCMSDetailSuccess(data));
  } catch (e) {
    yield put(fetchCMSDetailFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_CMS_DETAIL, sagaFetchCMSDetail);
}
