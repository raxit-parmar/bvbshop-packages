import { fetch, removeEmpty } from '../../Utils';

export const getCategory = async (payload: any = {}, apiInstance = null): Promise<any> => {
  return await fetch(`/category`, {
    method: 'POST',
    cache: true,
    body: removeEmpty(payload),
    apiInstance,
  });
};

export const getCategoryDetail = async ({ categoryId, queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/category/${categoryId}`, { cache: true, queryParams, apiInstance });
};
