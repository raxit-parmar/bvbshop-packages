import { fetch } from '../../Utils';

export const loginAPI = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/auth/login`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const registerAPI = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/auth/signup`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const forgotPasswordAPI = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/auth/forgotPassword`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const resetPasswordAPI = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/auth/resetPassword`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const verifyEmailAPI = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/auth/verifyEmail`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const sendVerifyEmail = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/auth/sendVerifyEmail`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const accountExistsOrNotByEmail = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch('/auth/accountExistsOrNotByEmail', {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};
