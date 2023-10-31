import { fetch } from '../Utils';

export const findSlug = async ({ slug, fullSlug = '', queryParams = {}, apiInstance = null }): Promise<any> => {
  return await fetch(`/slug/find`, {
    method: 'POST',
    body: { slug, fullSlug },
    cache: true,
    queryParams,
    apiInstance
  });
};
