import { put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_MANUFACTURER,
  fetchManufacturerFail,
  fetchManufacturerStarted,
  fetchManufacturerSuccess,
} from './actions';
import { getManufacturer } from './api';

export function* sagaFetchManufacturer(action: any) {
  yield put(fetchManufacturerStarted());
  try {
    const data = yield getManufacturer(action.payload);
    yield put(fetchManufacturerSuccess(data));
  } catch (e) {
    yield put(fetchManufacturerFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_MANUFACTURER, sagaFetchManufacturer);
}
