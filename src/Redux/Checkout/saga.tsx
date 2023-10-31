import { put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_CHECKOUT,
  fetchCheckoutFail,
  fetchCheckoutStarted,
  fetchCheckoutSuccess,
  SAVE_CHECKOUT_DETAIL,
} from './actions';
import { getCheckoutDetailAPI, saveCheckoutDetailAPI } from './api';

export function* sagaFetchCheckout(action: any) {
  yield put(fetchCheckoutStarted());
  try {
    const data = yield getCheckoutDetailAPI(action.payload);
    yield put(fetchCheckoutSuccess(data));
  } catch (e) {
    yield put(fetchCheckoutFail(e.message));
  }
}

export function* sagaSaveCheckoutDetail(action: any) {
  yield put(fetchCheckoutStarted());
  try {
    const data = yield saveCheckoutDetailAPI(action.payload);
    // TODO: Decide use new reducer.
    yield put(fetchCheckoutSuccess(data));
  } catch (e) {
    yield put(fetchCheckoutFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_CHECKOUT, sagaFetchCheckout);
  yield takeEvery(SAVE_CHECKOUT_DETAIL, sagaSaveCheckoutDetail);
}
