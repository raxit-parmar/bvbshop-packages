import { fetch, removeEmpty } from '../../Utils/helper';

export const getProducts = async ({
  payload = {},
  cache = true,
  queryParams = {},
  apiInstance = null,
}: {
  payload: any;
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product`, {
    method: 'POST',
    body: removeEmpty(payload),
    queryParams,
    cache,
    apiInstance
  });
};
