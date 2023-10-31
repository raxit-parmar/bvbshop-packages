import { fetch } from '../../Utils';

export const newsletterRegisterEmailAPI = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch('/newsletter/registerEmail', {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const newsletterConfirmEmailAPI = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch('/newsletter/confirmEmail', {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const newsletterOptInHashAPI = async ({ hash, apiInstance = null }): Promise<any> => {
  return await fetch(`/newsletter/optInHash/${hash}`, {
    method: 'GET',
    apiInstance
  });
};
