import { put, takeEvery } from 'redux-saga/effects';

import {
  DO_UPDATE_PROFILE,
  doUpdateProfileFail,
  doUpdateProfileStarted,
  doUpdateProfileSuccess,
  FETCH_LOGIN_USER,
  FETCH_USER_ORDER_DETAIL,
  FETCH_USER_ORDERS,
  fetchLoginUserFail,
  fetchLoginUserReset,
  fetchLoginUserStarted,
  fetchLoginUserSuccess,
  fetchUserOrderDetailFail,
  fetchUserOrderDetailStarted,
  fetchUserOrderDetailSuccess,
  fetchUserOrdersFail,
  fetchUserOrdersStarted,
  fetchUserOrdersSuccess,
  LOGOUT_USER,
  fetchUserPriceListStarted,
  fetchUserPriceListSuccess,
  fetchUserPriceListFail,
  FETCH_USER_PRICELIST,
} from './actions';
import { getLoginUserAPI, getPriceList, getUserOrderDetailAPI, getUserOrdersAPI, logoutAPI, updateProfileAPI } from './api';

export function* sagaDoUpdateProfile(action: any) {
  yield put(doUpdateProfileStarted());
  try {
    const data = yield updateProfileAPI(action.payload);
    yield put(doUpdateProfileSuccess(data));
  } catch (e) {
    yield put(doUpdateProfileFail(e.message));
  }
}

export function* sagaFetchLoginUser(action: any) {
  yield put(fetchLoginUserStarted());
  try {
    const data = yield getLoginUserAPI(action.payload);
    yield put(
      fetchLoginUserSuccess({
        // action.payload contain authorization
        accessToken: action.payload.authorization,
        user: data,
      }),
    );
  } catch (e) {
    yield put(fetchLoginUserFail(e.message));
  }
}

export function* sagaLogoutUser(action: any) {
  try {
    yield put(fetchLoginUserReset());
    yield logoutAPI();
  } catch (e) {}
}

export function* sagaFetchUserOrders(action: any) {
  yield put(fetchUserOrdersStarted());
  try {
    const data = yield getUserOrdersAPI(action.payload);
    yield put(fetchUserOrdersSuccess(data));
  } catch (e) {
    yield put(fetchUserOrdersFail(e.message));
  }
}

export function* sagaFetchUserOrderDetail(action: any) {
  yield put(fetchUserOrderDetailStarted());
  try {
    const data = yield getUserOrderDetailAPI(action.payload);
    yield put(fetchUserOrderDetailSuccess(data));
  } catch (e) {
    yield put(fetchUserOrderDetailFail(e.message));
  }
}

export function* sagaFetchUserPriceList(action: any) {
  yield put(fetchUserPriceListStarted());
  try {
    const data = yield getPriceList(action.payload);
    yield put(fetchUserPriceListSuccess(data));
  } catch (e) {
    yield put(fetchUserPriceListFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(DO_UPDATE_PROFILE, sagaDoUpdateProfile);
  yield takeEvery(FETCH_LOGIN_USER, sagaFetchLoginUser);
  yield takeEvery(LOGOUT_USER, sagaLogoutUser);
  yield takeEvery(FETCH_USER_ORDERS, sagaFetchUserOrders);
  yield takeEvery(FETCH_USER_ORDER_DETAIL, sagaFetchUserOrderDetail);
  yield takeEvery(FETCH_USER_PRICELIST, sagaFetchUserPriceList);
}
