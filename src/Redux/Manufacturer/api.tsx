import { fetch, removeEmpty } from '../../Utils';

export const getManufacturer = async (payload: any = {}, apiInstance: any = null): Promise<any> => {
  return await fetch(`/manufacturer`, {
    method: 'POST',
    cache: true,
    body: removeEmpty(payload),
    apiInstance,
  });
};

export const getManufacturerDetail = async ({ manufacturerId, queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/manufacturer/${manufacturerId}`, {
    cache: true,
    queryParams,
    apiInstance,
  });
};
