import { put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_CURRENCY_RATE,
  fetchCurrencyRateFail,
  fetchCurrencyRateStarted,
  fetchCurrencyRateSuccess,
} from './actions';
import { getCurrencyRate } from './api';

export function* sagaFetchCurrencyRate() {
  yield put(fetchCurrencyRateStarted());
  try {
    const data = yield getCurrencyRate();
    yield put(fetchCurrencyRateSuccess(data));
  } catch (e) {
    yield put(fetchCurrencyRateFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_CURRENCY_RATE, sagaFetchCurrencyRate);
}
