import { fetch } from '../../Utils';

export const getReturnRepairOrder = async ({ queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/returnRepair/order`, {
    queryParams,
    apiInstance,
  });
};

export const getReturnRepairOrderDetail = async ({ orderId, queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/returnRepair/order/${orderId}`, {
    queryParams,
    apiInstance,
  });
};

export const addReturnRepairRequest = async ({
  payload: body = {},
  queryParams = {},
  apiInstance = null,
}): Promise<any> => {
  return await fetch(`/returnRepair`, {
    method: 'POST',
    body,
    queryParams,
    apiInstance,
  });
};
