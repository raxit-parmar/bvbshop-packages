import { fetch } from '../../Utils';

export const getCheckoutDetailAPI = async ({
  cartId,
  queryParams = {},
  apiInstance = null,
}: {
  cartId: string;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/checkout/${cartId}`, {
    queryParams,
    apiInstance,
  });
};

export const saveCheckoutDetailAPI = async ({
  cartId,
  payload,
  apiInstance = null,
}: {
  cartId: string;
  payload: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/checkout/${cartId}`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const processOrderAPI = async ({ cartId, apiInstance = null }: { cartId: string; apiInstance?: any }): Promise<any> => {
  return await fetch(`/checkout/${cartId}/processOrder`, {
    method: 'POST',
    apiInstance,
  });
};

export const finishOrderAPI = async ({
  orderId,
  queryParams = {},
  apiInstance = null,
}: {
  orderId: string;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/checkout/${orderId}/finishOrder`, {
    method: 'POST',
    queryParams,
    apiInstance,
  });
};

export const getOrderContentAPI = async ({
  orderId,
  status,
  queryParams = {},
  apiInstance = null,
}: {
  orderId: string;
  status: string;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/checkout/${orderId}/content/${status}`, {
    method: 'POST',
    queryParams,
    apiInstance,
  });
};

export const getDeliveryLocationsAPI = async (payload, apiInstance = null): Promise<any> => {
  return await fetch(`/checkout/getDeliveryLocations`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const getDeliveryTimeAPI = async (payload, apiInstance = null): Promise<any> => {
  return await fetch(`/checkout/getDeliveryTime`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const validateAddressAPI = async (payload, apiInstance = null): Promise<any> => {
  return await fetch(`/checkout/validateAddress`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const validateZipcodeAPI = async (payload, apiInstance = null): Promise<any> => {
  return await fetch(`/checkout/zipValidation`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const validateVatIdAPI = async (payload, apiInstance = null): Promise<any> => {
  return await fetch(`/checkout/validateVatId`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const calculateShippingCharges = async ({
  cartId,
  payload,
  apiInstance = null,
}: {
  cartId: string;
  payload: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/checkout/${cartId}/calculateShippingCharges`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const getAmazonPayCountryDetailsAPI = async (payload, apiInstance = null): Promise<any> => {
  return await fetch(`/checkout/getAmazonPayCountryDetails`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};
