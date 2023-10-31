import { fetch } from '../../Utils';

export const updateProfileAPI = async ({
  payload = {},
  apiInstance = null,
}: {
  payload: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/user/updateProfile`, {
    method: 'PUT',
    body: payload,
    apiInstance,
  });
};

export const logoutAPI = async ({ apiInstance = null } = {}): Promise<any> => {
  return await fetch(`/user/logout`, {
    method: 'DELETE',
    apiInstance,
  });
};

export const getLoginUserAPI = async ({
  authorization = null,
  queryParams = {},
  apiInstance = null,
}: {
  authorization?: string;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/user/me`, {
    headers: {
      authorization,
    },
    queryParams,
    apiInstance,
  });
};

export const getUserOrdersAPI = async ({
  queryParams = {},
  apiInstance = null,
}: {
  queryParams: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/user/order`, {
    method: 'GET',
    queryParams,
    apiInstance,
  });
};

export const getUserOrderDetailAPI = async ({
  orderId = '',
  queryParams = {},
  apiInstance = null,
}: {
  orderId: string;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/user/order/${orderId}`, {
    queryParams,
    apiInstance,
  });
};

export const updateOrder = async ({
  orderId = '',
  queryParams = {},
  payload = {},
  apiInstance = null,
}: {
  orderId: string;
  queryParams?: any;
  payload?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/user/order/${orderId}`, {
    method: 'PUT',
    queryParams,
    body: payload,
    apiInstance,
  });
};

export const downloadInvoice = ({
  invoiceHash = '',
  apiInstance = null,
}: {
  invoiceHash: string;
  apiInstance?: any;
}): Promise<any> => {
  return fetch(`/user/order/${invoiceHash}/downloadInvoice`, {
    json: false,
    apiInstance,
  });
};

export const getPriceList = async ({
  payload = {},
  apiInstance = null,
  authorization = null,
}: {
  payload: any;
  apiInstance?: any;
  authorization?: string;
}): Promise<any> => {
  return await fetch('/user/priceList', {
    apiInstance,
    method: 'POST',
    headers: {
      authorization,
    },
    body: payload,
    json: payload && payload?.isPDFDownload ? false : true,
  });
};

export const getReOrderCartIdAPI = async ({
  orderHash = '',
  queryParams = {},
  apiInstance = null,
}): Promise<any> => {
  return await fetch(`/user/${orderHash}/reorderItems`, {
    method: 'GET',
    queryParams,
    apiInstance,
  });
};
