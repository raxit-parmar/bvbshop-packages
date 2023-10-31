import { fetch } from '../../Utils';

export const getWebwinkelkeur = async ({ apiInstance = null } = {}): Promise<any> => {
  return await fetch(`/settings/getWebwinkelkeur`, {
    cache: true,
    cacheTTL: 1 * 24 * 60 * 60,
    apiInstance
  });
};

export const getSettings = async ({ apiInstance = null } = {}): Promise<any> => {
  return await fetch(`/settings`, {
    cache: true,
    cacheTTL: 1 * 24 * 60 * 60,
    apiInstance
  });
};
