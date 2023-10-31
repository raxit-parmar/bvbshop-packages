import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_STARTED,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESET,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_STARTED,
  RESET_PASSWORD_SUCCESS,
} from './actions';

// Login
const initialLoginState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialLoginState = () => deepClone(initialLoginState);

export const login = (state = getInitialLoginState(), action: any) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case LOGIN_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case LOGIN_RESET:
      return getInitialLoginState();
    default:
      return state;
  }
};

// Register
const initialRegisterState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialRegisterState = () => deepClone(initialRegisterState);

export const register = (state = getInitialRegisterState(), action: any) => {
  switch (action.type) {
    case REGISTER_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case REGISTER_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case REGISTER_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case REGISTER_RESET:
      return getInitialRegisterState();
    default:
      return state;
  }
};

// Forgot Password
const initialForgotPasswordState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialForgotPasswordState = () => deepClone(initialForgotPasswordState);

export const forgotPassword = (state = getInitialForgotPasswordState(), action: any) => {
  switch (action.type) {
    case FORGOT_PASSWORD_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FORGOT_PASSWORD_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FORGOT_PASSWORD_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FORGOT_PASSWORD_RESET:
      return getInitialForgotPasswordState();
    default:
      return state;
  }
};

// Reset Password
const initialResetPasswordState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialResetPasswordState = () => deepClone(initialResetPasswordState);

export const resetPassword = (state = getInitialResetPasswordState(), action: any) => {
  switch (action.type) {
    case RESET_PASSWORD_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case RESET_PASSWORD_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case RESET_PASSWORD_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case RESET_PASSWORD_RESET:
      return getInitialResetPasswordState();
    default:
      return state;
  }
};
