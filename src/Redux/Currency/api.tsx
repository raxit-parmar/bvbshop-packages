import { fetch } from '../../Utils';

export const getCurrencyRate = async (queryParams = { target: 'USD,GBP' }, apiInstance = null): Promise<any> => {
  return await fetch(`/currency/rate`, {
    cache: true,
    cacheTTL: 0.5 * 24 * 60 * 60,
    queryParams,
    apiInstance,
  });
};
