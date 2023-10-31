// Login
export const DO_LOGIN = 'DO_LOGIN';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_RESET = 'LOGIN_RESET';

export const doLogin = (data: any) => ({
  type: DO_LOGIN,
  payload: data,
});

export const loginStarted = () => ({
  type: LOGIN_STARTED,
});

export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFail = (error: any) => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const loginReset = () => ({
  type: LOGIN_RESET,
});

// Register
export const DO_REGISTER = 'DO_REGISTER';
export const REGISTER_STARTED = 'REGISTER_STARTED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const REGISTER_RESET = 'REGISTER_RESET';

export const doRegister = (data: any) => ({
  type: DO_REGISTER,
  payload: data,
});

export const registerStarted = () => ({
  type: REGISTER_STARTED,
});

export const registerSuccess = (data: any) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFail = (error: any) => ({
  type: REGISTER_FAIL,
  payload: error,
});

export const registerReset = () => ({
  type: REGISTER_RESET,
});

// Forgot Password
export const DO_FORGOT_PASSWORD = 'DO_FORGOT_PASSWORD';
export const FORGOT_PASSWORD_STARTED = 'FORGOT_PASSWORD_STARTED';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
export const FORGOT_PASSWORD_RESET = 'FORGOT_PASSWORD_RESET';

export const doForgotPassword = (data: any) => ({
  type: DO_FORGOT_PASSWORD,
  payload: data,
});

export const forgotPasswordStarted = () => ({
  type: FORGOT_PASSWORD_STARTED,
});

export const forgotPasswordSuccess = (data: any) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: data,
});

export const forgotPasswordFail = (error: any) => ({
  type: FORGOT_PASSWORD_FAIL,
  payload: error,
});

export const forgotPasswordReset = () => ({
  type: FORGOT_PASSWORD_RESET,
});

// Reset Password
export const DO_RESET_PASSWORD = 'DO_RESET_PASSWORD';
export const RESET_PASSWORD_STARTED = 'RESET_PASSWORD_STARTED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';
export const RESET_PASSWORD_RESET = 'RESET_PASSWORD_RESET';

export const doResetPassword = (data: any) => ({
  type: DO_RESET_PASSWORD,
  payload: data,
});

export const resetPasswordStarted = () => ({
  type: RESET_PASSWORD_STARTED,
});

export const resetPasswordSuccess = (data: any) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const resetPasswordFail = (error: any) => ({
  type: RESET_PASSWORD_FAIL,
  payload: error,
});

export const resetPasswordReset = () => ({
  type: RESET_PASSWORD_RESET,
});
