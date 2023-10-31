import { fetch } from '../../Utils';

export const getMenu = async (queryParams: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/menu`, {
    cache: true,
    queryParams,
    apiInstance,
  });
};
