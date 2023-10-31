import { fetch } from '../../Utils';

export const getCMSDetail = async ({
  cmsId,
  queryParams = {},
  cache = true,
  apiInstance = null,
}: {
  cmsId: string;
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/cms/${cmsId}`, { cache, queryParams, apiInstance });
};

export const getT3PageDetail = async ({
  t3PageId,
  queryParams = {},
  cache = true,
  apiInstance = null,
}: {
  t3PageId: string;
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any
}): Promise<any> => {
  return await fetch(`/cms/t3Page/${t3PageId}`, { cache, queryParams, apiInstance });
};

export const getHomePageCMS = async ({
  queryParams = {},
  cache = true,
  apiInstance = null,
}: {
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/cms/home`, { cache, queryParams, apiInstance });
};

export const getNotificationBar = async ({
  queryParams = {},
  cache = true,
  apiInstance = null,
}: { queryParams?: any; cache?: boolean, apiInstance?: any } = {}): Promise<any> => {
  return await fetch(`/cms/notificationBar`, { cache, queryParams, apiInstance });
};

export const saveFormCMSAPI = async (payload: any = {}, apiInstance = null): Promise<any> => {
  return await fetch(`/cms/saveForm`, {
    method: 'POST',
    body: payload,
    apiInstance
  });
};

export const saveContactFormCMSAPI = async (payload: any = {}, apiInstance = null): Promise<any> => {
  return await fetch(`/cms/saveContactForm`, {
    method: 'POST',
    body: payload,
    apiInstance
  });
};

export const unsubscribeReviewInvitationAPI = async (payload: any = {}, apiInstance = null): Promise<any> => {
  return await fetch(`/cms/unsubscribeReviewInvitation`, {
    method: 'POST',
    body: payload,
    apiInstance
  });
};
