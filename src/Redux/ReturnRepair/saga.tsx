import { put, takeEvery } from 'redux-saga/effects';

import {
  CREATE_RETURN_REPAIR_REQUEST,
  createReturnRepairRequestFail,
  createReturnRepairRequestStarted,
  createReturnRepairRequestSuccess,
  FETCH_RETURN_REPAIR_ORDER,
  FETCH_RETURN_REPAIR_ORDER_DETAIL,
  fetchReturnRepairOrderDetailFail,
  fetchReturnRepairOrderDetailStarted,
  fetchReturnRepairOrderDetailSuccess,
  fetchReturnRepairOrderFail,
  fetchReturnRepairOrderStarted,
  fetchReturnRepairOrderSuccess,
} from './actions';
import { addReturnRepairRequest, getReturnRepairOrder, getReturnRepairOrderDetail } from './api';

export function* sagaFetchReturnRepairOrder(action: any) {
  yield put(fetchReturnRepairOrderStarted());
  try {
    const data = yield getReturnRepairOrder(action.payload);
    yield put(fetchReturnRepairOrderSuccess(data));
  } catch (e) {
    yield put(fetchReturnRepairOrderFail(e.message));
  }
}

export function* sagaFetchReturnRepairOrderDetail(action: any) {
  yield put(fetchReturnRepairOrderDetailStarted());
  try {
    const data = yield getReturnRepairOrderDetail(action.payload);
    yield put(fetchReturnRepairOrderDetailSuccess(data));
  } catch (e) {
    yield put(fetchReturnRepairOrderDetailFail(e.message));
  }
}

export function* sagaCreateReturnRepair(action: any) {
  yield put(createReturnRepairRequestStarted());
  try {
    const data = yield addReturnRepairRequest(action.payload);
    yield put(createReturnRepairRequestSuccess(data));
  } catch (e) {
    yield put(createReturnRepairRequestFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_RETURN_REPAIR_ORDER, sagaFetchReturnRepairOrder);
  yield takeEvery(FETCH_RETURN_REPAIR_ORDER_DETAIL, sagaFetchReturnRepairOrderDetail);
  yield takeEvery(CREATE_RETURN_REPAIR_REQUEST, sagaCreateReturnRepair);
}
