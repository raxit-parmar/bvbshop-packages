import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_WEBWINKELKEUR, fetchWebWinkelkeurSuccess, fetchSettingsSuccess, FETCH_SETTINGS } from './actions';
import { getWebwinkelkeur, getSettings } from './api';

export function* sagaFetchWebWinkelkeur() {
  try {
    const data = yield getWebwinkelkeur();
    yield put(fetchWebWinkelkeurSuccess(data));
  } catch (e) {
    yield put(fetchWebWinkelkeurSuccess(e.message));
  }
}

export function* sagaFetchSettings() {
  try {
    const data = yield getSettings();
    yield put(fetchSettingsSuccess(data));
  } catch (e) {
    yield put(fetchSettingsSuccess(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_WEBWINKELKEUR, sagaFetchWebWinkelkeur);
  yield takeEvery(FETCH_SETTINGS, sagaFetchSettings);
}
