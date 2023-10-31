import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_PRODUCTS, fetchProductsFail, fetchProductsStarted, fetchProductsSuccess } from './actions';
import { getProducts } from './api';

export function* sagaFetchProducts(action: any) {
  yield put(fetchProductsStarted());
  try {
    const topProducts = yield getProducts(action.payload);
    yield put(fetchProductsSuccess(topProducts));
  } catch (e) {
    yield put(fetchProductsFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_PRODUCTS, sagaFetchProducts);
}
