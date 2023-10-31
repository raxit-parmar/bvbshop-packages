import { fetch } from '../../Utils';

export const autoCompleteSearchAPI = async ({ payload, queryParams, apiInstance }: any): Promise<any> => {
  return await fetch('/autocomplete/search', {
    queryParams,
    apiInstance,
    method: 'POST',
    body: payload,
    isAPIQueue: true,
  });
};
