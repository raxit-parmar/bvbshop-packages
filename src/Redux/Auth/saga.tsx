import { put, takeEvery } from 'redux-saga/effects';

import {
  DO_FORGOT_PASSWORD,
  DO_LOGIN,
  DO_REGISTER,
  DO_RESET_PASSWORD,
  forgotPasswordFail,
  forgotPasswordStarted,
  forgotPasswordSuccess,
  loginFail,
  loginStarted,
  loginSuccess,
  registerFail,
  registerStarted,
  registerSuccess,
  resetPasswordFail,
  resetPasswordStarted,
  resetPasswordSuccess,
} from './actions';
import { forgotPasswordAPI, loginAPI, registerAPI, resetPasswordAPI } from './api';

//Login
export function* sagaDoLogin(action: any) {
  yield put(loginStarted());
  try {
    const data = yield loginAPI(action.payload);
    yield put(loginSuccess(data));
  } catch (e) {
    yield put(loginFail(e.message));
  }
}

//Login
export function* sagaDoRegister(action: any) {
  yield put(registerStarted());
  try {
    const data = yield registerAPI(action.payload);
    yield put(registerSuccess(data));
  } catch (e) {
    yield put(registerFail(e.message));
  }
}

// Forgot Password
export function* sagaDoForgotPassword(action: any) {
  yield put(forgotPasswordStarted());
  try {
    const data = yield forgotPasswordAPI(action.payload);
    yield put(forgotPasswordSuccess(data));
  } catch (e) {
    yield put(forgotPasswordFail(e.message));
  }
}

// Reset Password
export function* sagaDoResetPassword(action: any) {
  yield put(resetPasswordStarted());
  try {
    const data = yield resetPasswordAPI(action.payload);
    yield put(resetPasswordSuccess(data));
  } catch (e) {
    yield put(resetPasswordFail(e.message));
  }
}

export default function* rootSaga() {
  // Login
  yield takeEvery(DO_LOGIN, sagaDoLogin);
  // Register
  yield takeEvery(DO_REGISTER, sagaDoRegister);
  // Forgot Password
  yield takeEvery(DO_FORGOT_PASSWORD, sagaDoForgotPassword);
  // Reset Password
  yield takeEvery(DO_RESET_PASSWORD, sagaDoResetPassword);
}
