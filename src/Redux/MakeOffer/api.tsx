import { fetch } from '../../Utils';

export const getMakeOfferCustomerList = async ({ payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch('/makeOffer/getCustomers', {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const saveCartProposal = async ({ payload = {} }): Promise<any> => {
  return await fetch('/makeOffer/saveCartProposal', {
    method: 'POST',
    body: payload,
  });
};

export const convertCartToOrder = async ({ payload = {}, apiInstance = null }): Promise<any> => {
  return await fetch('/makeOffer/convertCartToOrder', {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};
