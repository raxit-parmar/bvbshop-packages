import { fetch } from '../../Utils';

export const getAllFAQ = async ({ queryParams = {}, apiInstance = null } = {}): Promise<any> => {
  return await fetch(`/faq/category`, { cache: true, queryParams, apiInstance });
};

export const getFAQDetail = async ({ categoryId, queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/faq/category/${categoryId}`, { cache: true, queryParams, apiInstance });
};
