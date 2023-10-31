import { fetch } from '../Utils';

export const getSiteMap = async ({ apiInstance = null } = {}): Promise<any> => {
  return await fetch(`/sitemap`, {
    method: 'GET',
    cacheTTL: 24 * 60 * 60 * 2, // 2 days cache
    cache: true,
    apiInstance
  });
};

export const getNewSiteMap = async ({ apiInstance = null } = {}): Promise<any> => {
  return await fetch(`/sitemap/newSiteMap`, {
    method: 'GET',
    cacheTTL: 24 * 60 * 60 * 2, // 2 days cache
    cache: true,
    apiInstance
  });
};

export const getImageSiteMap = async ({ apiInstance = null } = {}): Promise<any> => {
  return await fetch('/sitemap/imageSitemap', {
    method: 'GET',
    cacheTTL: 24 * 60 * 60 * 2,
    cache: true,
    apiInstance
  });
};

export const getVideoSiteMap = async ({ apiInstance = null } = {}): Promise<any> => {
  return await fetch('/sitemap/videoSitemap', {
    method: 'GET',
    cacheTTL: 24 * 60 * 60 * 2,
    cache: true,
    apiInstance
  });
};
