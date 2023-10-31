import { fetch } from '../../Utils/helper';
import { ProductFilterRequestModal } from './reducer';

export const getProduct = async ({
  productId,
  cache = false,
  queryParams = {},
  apiInstance = null,
}: {
  productId: number | string;
  cache?: boolean;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}`, {
    cache,
    queryParams,
    apiInstance,
  });
};

export const getProductBundle = async (productId: number | string, apiInstance = null): Promise<any> => {
  return await fetch(`/product/${productId}/bundle`, { apiInstance });
};

export const getProductAlsoBought = async (productId: number | string, apiInstance = null): Promise<any> => {
  return await fetch(`/product/${productId}/alsoBought`, { apiInstance });
};

export const getRelatedProduct = async (productId: number | string, apiInstance = null): Promise<any> => {
  return await fetch(`/product/${productId}/relatedProduct`, { apiInstance });
};

export const getProductReviews = async ({
  productId,
  queryParams = {},
  apiInstance = null,
}: {
  productId: number | string;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/reviews`, { queryParams, apiInstance });
};

// TODO: Find out way to implement dynamic isLoading & error for reducer
export const saveProductReview = async ({
  productId,
  payload = {},
  apiInstance = null,
}: {
  productId: number | string;
  payload: any;
  apiInstance: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/reviews`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const getProductFaqs = async ({
  productId,
  queryParams = {},
  apiInstance = null,
}: {
  productId: number | string;
  queryParams?: any;
  apiInstance: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/faqs`, { queryParams, apiInstance });
};

export const saveProductFaq = async ({
  productId,
  payload = {},
  apiInstance = null,
}: {
  productId: number | string;
  payload: any;
  apiInstance: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/faqs`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const wishlistProductAPI = async ({
  productId,
  apiInstance = null,
}: {
  productId: number | string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/wishlist`, {
    method: 'POST',
    apiInstance,
  });
};

export const removeWishlistProductAPI = async ({
  productId,
  apiInstance = null,
}: {
  productId: number | string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/wishlist`, {
    method: 'DELETE',
    apiInstance,
  });
};

export const getWishlistProductsAPI = async ({
  queryParams = {},
  apiInstance = null,
}: {
  queryParams: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/wishlistProducts`, {
    queryParams,
    apiInstance,
  });
};

export const getProductFilter = async ({
  payload = {},
  queryParams = {},
  apiInstance = null,
}: {
  payload: ProductFilterRequestModal;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/filter`, {
    method: 'POST',
    body: payload,
    cache: true,
    queryParams,
    apiInstance,
  });
};

export const inStockNotification = async ({
  productId,
  payload = {},
  queryParams = {},
  apiInstance = null,
}: {
  productId: number | string;
  payload: any;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/notification`, {
    method: 'POST',
    body: payload,
    queryParams,
    apiInstance,
  });
};

export const stockNotification = async ({
  productId,
  payload = {},
  queryParams = {},
  apiInstance = null,
}: {
  productId: number | string;
  payload: any;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/stockNotification`, {
    method: 'POST',
    body: payload,
    queryParams,
    apiInstance,
  });
};

export const productNotificationEmail = async ({
  productId,
  payload = {},
  queryParams = {},
  apiInstance = null,
}: {
  productId: number | string;
  payload: any;
  queryParams?: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/product/${productId}/productNotificationEmail`, {
    method: 'POST',
    body: payload,
    queryParams,
    apiInstance,
  });
};

export const productStockStatusAPI = async ({
  productIds,
}: {
  productIds: any;
}): Promise<any> => {
  return await fetch('/product/stockStatus', {
    method: 'POST',
    body: {
      productIds,
    },
  });
};

export const productSaveDetailsViewAPI = async ({
  productId,
}: {
  productId: any;
}): Promise<any> => {
  return await fetch('/product/saveProductDetailsView', {
    method: 'POST',
    body: {
      productId,
    },
  });
};

export const getLinkForEditProductBackend = async (hash: string): Promise<any> => {
  return await fetch(`/product/edit-product-backend/${hash}`);
};