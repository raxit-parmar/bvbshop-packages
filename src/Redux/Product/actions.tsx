import { ProductFilterRequestModal } from './reducer';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_STARTED = 'FETCH_PRODUCT_STARTED';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAIL = 'FETCH_PRODUCT_FAIL';
export const FETCH_PRODUCT_RESET = 'FETCH_PRODUCT_RESET';

export const fetchProduct = (data: any) => ({
  type: FETCH_PRODUCT,
  payload: data,
});

export const fetchProductStarted = () => ({
  type: FETCH_PRODUCT_STARTED,
});

export const fetchProductSuccess = (data: any) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: data,
});

export const fetchProductFail = (error: any) => ({
  type: FETCH_PRODUCT_FAIL,
  payload: error,
});

export const fetchProductReset = () => ({
  type: FETCH_PRODUCT_RESET,
});

// Product Bundle
export const FETCH_PRODUCT_BUNDLE = 'FETCH_PRODUCT_BUNDLE';
export const FETCH_PRODUCT_BUNDLE_STARTED = 'FETCH_PRODUCT_BUNDLE_STARTED';
export const FETCH_PRODUCT_BUNDLE_SUCCESS = 'FETCH_PRODUCT_BUNDLE_SUCCESS';
export const FETCH_PRODUCT_BUNDLE_FAIL = 'FETCH_PRODUCT_BUNDLE_FAIL';
export const FETCH_PRODUCT_BUNDLE_RESET = 'FETCH_PRODUCT_BUNDLE_RESET';

export const fetchProductBundle = (data: any) => ({
  type: FETCH_PRODUCT_BUNDLE,
  payload: data,
});

export const fetchProductBundleStarted = () => ({
  type: FETCH_PRODUCT_BUNDLE_STARTED,
});

export const fetchProductBundleSuccess = (data: any) => ({
  type: FETCH_PRODUCT_BUNDLE_SUCCESS,
  payload: data,
});

export const fetchProductBundleFail = (error: any) => ({
  type: FETCH_PRODUCT_BUNDLE_FAIL,
  payload: error,
});

export const fetchProductBundleReset = () => ({
  type: FETCH_PRODUCT_BUNDLE_RESET,
});

// Product Also Bought
export const FETCH_PRODUCT_ALSO_BOUGHT = 'FETCH_PRODUCT_ALSO_BOUGHT';
export const FETCH_PRODUCT_ALSO_BOUGHT_STARTED = 'FETCH_PRODUCT_ALSO_BOUGHT_STARTED';
export const FETCH_PRODUCT_ALSO_BOUGHT_SUCCESS = 'FETCH_PRODUCT_ALSO_BOUGHT_SUCCESS';
export const FETCH_PRODUCT_ALSO_BOUGHT_FAIL = 'FETCH_PRODUCT_ALSO_BOUGHT_FAIL';
export const FETCH_PRODUCT_ALSO_BOUGHT_RESET = 'FETCH_PRODUCT_ALSO_BOUGHT_RESET';

export const fetchProductAlsoBought = (data: any) => ({
  type: FETCH_PRODUCT_ALSO_BOUGHT,
  payload: data,
});

export const fetchProductAlsoBoughtStarted = () => ({
  type: FETCH_PRODUCT_ALSO_BOUGHT_STARTED,
});

export const fetchProductAlsoBoughtSuccess = (data: any) => ({
  type: FETCH_PRODUCT_ALSO_BOUGHT_SUCCESS,
  payload: data,
});

export const fetchProductAlsoBoughtFail = (error: any) => ({
  type: FETCH_PRODUCT_ALSO_BOUGHT_FAIL,
  payload: error,
});

export const fetchProductAlsoBoughtReset = () => ({
  type: FETCH_PRODUCT_ALSO_BOUGHT_RESET,
});

// Related Products
export const FETCH_RELATED_PRODUCT = 'FETCH_RELATED_PRODUCT';
export const FETCH_RELATED_PRODUCT_STARTED = 'FETCH_RELATED_PRODUCT_STARTED';
export const FETCH_RELATED_PRODUCT_SUCCESS = 'FETCH_RELATED_PRODUCT_SUCCESS';
export const FETCH_RELATED_PRODUCT_FAIL = 'FETCH_RELATED_PRODUCT_FAIL';
export const FETCH_RELATED_PRODUCT_RESET = 'FETCH_RELATED_PRODUCT_RESET';

export const fetchRelatedProduct = (data: any) => ({
  type: FETCH_RELATED_PRODUCT,
  payload: data,
});

export const fetchRelatedProductStarted = () => ({
  type: FETCH_RELATED_PRODUCT_STARTED,
});

export const fetchRelatedProductSuccess = (data: any) => ({
  type: FETCH_RELATED_PRODUCT_SUCCESS,
  payload: data,
});

export const fetchRelatedProductFail = (error: any) => ({
  type: FETCH_RELATED_PRODUCT_FAIL,
  payload: error,
});

export const fetchRelatedProductReset = () => ({
  type: FETCH_RELATED_PRODUCT_RESET,
});

// Product Reviews
export const FETCH_PRODUCT_REVIEWS = 'FETCH_PRODUCT_REVIEWS';
export const FETCH_PRODUCT_REVIEWS_STARTED = 'FETCH_PRODUCT_REVIEWS_STARTED';
export const FETCH_PRODUCT_REVIEWS_SUCCESS = 'FETCH_PRODUCT_REVIEWS_SUCCESS';
export const FETCH_PRODUCT_REVIEWS_FAIL = 'FETCH_PRODUCT_REVIEWS_FAIL';
export const FETCH_PRODUCT_REVIEWS_RESET = 'FETCH_PRODUCT_REVIEWS_RESET';

export const fetchProductReviews = (data: any) => ({
  type: FETCH_PRODUCT_REVIEWS,
  payload: data,
});

export const fetchProductReviewsStarted = () => ({
  type: FETCH_PRODUCT_REVIEWS_STARTED,
});

export const fetchProductReviewsSuccess = (data: any) => ({
  type: FETCH_PRODUCT_REVIEWS_SUCCESS,
  payload: data,
});

export const fetchProductReviewsFail = (error: any) => ({
  type: FETCH_PRODUCT_REVIEWS_FAIL,
  payload: error,
});

export const fetchProductReviewsReset = () => ({
  type: FETCH_PRODUCT_REVIEWS_RESET,
});

// Product FAQs
export const FETCH_PRODUCT_FAQS = 'FETCH_PRODUCT_FAQS';
export const FETCH_PRODUCT_FAQS_STARTED = 'FETCH_PRODUCT_FAQS_STARTED';
export const FETCH_PRODUCT_FAQS_SUCCESS = 'FETCH_PRODUCT_FAQS_SUCCESS';
export const FETCH_PRODUCT_FAQS_FAIL = 'FETCH_PRODUCT_FAQS_FAIL';
export const FETCH_PRODUCT_FAQS_RESET = 'FETCH_PRODUCT_FAQS_RESET';

export const fetchProductFAQs = (data: any) => ({
  type: FETCH_PRODUCT_FAQS,
  payload: data,
});

export const fetchProductFAQsStarted = () => ({
  type: FETCH_PRODUCT_FAQS_STARTED,
});

export const fetchProductFAQsSuccess = (data: any) => ({
  type: FETCH_PRODUCT_FAQS_SUCCESS,
  payload: data,
});

export const fetchProductFAQsFail = (error: any) => ({
  type: FETCH_PRODUCT_FAQS_FAIL,
  payload: error,
});

export const fetchProductFAQsReset = () => ({
  type: FETCH_PRODUCT_FAQS_RESET,
});

// Product Wishlist
export const WISHLIST_PRODUCT = 'WISHLIST_PRODUCT';
export const REMOVE_WISHLIST_PRODUCT = 'REMOVE_WISHLIST_PRODUCT';

export const FETCH_WISHLIST_PRODUCTS = 'FETCH_WISHLIST_PRODUCTS';
export const FETCH_WISHLIST_PRODUCTS_STARTED = 'FETCH_WISHLIST_PRODUCTS_STARTED';
export const FETCH_WISHLIST_PRODUCTS_SUCCESS = 'FETCH_WISHLIST_PRODUCTS_SUCCESS';
export const FETCH_WISHLIST_PRODUCTS_FAIL = 'FETCH_WISHLIST_PRODUCTS_FAIL';
export const FETCH_WISHLIST_PRODUCTS_RESET = 'FETCH_WISHLIST_PRODUCTS_RESET';

export const wishlistProduct = (data: any) => ({
  type: WISHLIST_PRODUCT,
  payload: data,
});

export const removeWishlistProduct = (data: any) => ({
  type: REMOVE_WISHLIST_PRODUCT,
  payload: data,
});

export const fetchWishlistProducts = (data: any) => ({
  type: FETCH_WISHLIST_PRODUCTS,
  payload: data,
});

export const fetchWishlistProductsSuccess = (data: any) => ({
  type: FETCH_WISHLIST_PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchWishlistProductsStarted = () => ({
  type: FETCH_WISHLIST_PRODUCTS_STARTED,
});

export const fetchWishlistProductsFail = (error: any) => ({
  type: FETCH_WISHLIST_PRODUCTS_FAIL,
  payload: error,
});

export const fetchWishlistProductsReset = () => ({
  type: FETCH_WISHLIST_PRODUCTS_RESET,
});

export const FETCH_PRODUCT_FILTER = 'FETCH_PRODUCT_FILTER';
export const FETCH_PRODUCT_FILTER_ON_CHECKED = 'FETCH_PRODUCT_FILTER_ON_CHECKED';
export const FETCH_PRODUCT_FILTER_STARTED = 'FETCH_PRODUCT_FILTER_STARTED';
export const FETCH_PRODUCT_FILTER_SUCCESS = 'FETCH_PRODUCT_FILTER_SUCCESS';
export const FETCH_PRODUCT_FILTER_FAIL = 'FETCH_PRODUCT_FILTER_FAIL';
export const FETCH_PRODUCT_FILTER_RESET = 'FETCH_PRODUCT_FILTER_RESET';

export const fetchProductFilter = (data: { payload: ProductFilterRequestModal }) => ({
  type: FETCH_PRODUCT_FILTER,
  payload: data,
});

export const fetchProductFilterOnChecked = (data: any) => ({
  type: FETCH_PRODUCT_FILTER_ON_CHECKED,
  payload: data,
});

export const fetchProductFilterStarted = () => ({
  type: FETCH_PRODUCT_FILTER_STARTED,
});

export const fetchProductFilterSuccess = (data: any) => ({
  type: FETCH_PRODUCT_FILTER_SUCCESS,
  payload: data,
});

export const fetchProductFilterFail = (error: any) => ({
  type: FETCH_PRODUCT_FILTER_FAIL,
  payload: error,
});

export const fetchProductFilterReset = () => ({
  type: FETCH_PRODUCT_FILTER_RESET,
});

// Product in stock notification
export const FETCH_PRODUCT_IN_STOCK_NOTIFICATION = 'FETCH_PRODUCT_IN_STOCK_NOTIFICATION';
export const FETCH_PRODUCT_IN_STOCK_NOTIFICATION_STARTED = 'FETCH_PRODUCT_IN_STOCK_NOTIFICATION_STARTED';
export const FETCH_PRODUCT_IN_STOCK_NOTIFICATION_SUCCESS = 'FETCH_PRODUCT_IN_STOCK_NOTIFICATION_SUCCESS';
export const FETCH_PRODUCT_IN_STOCK_NOTIFICATION_FAIL = 'FETCH_PRODUCT_IN_STOCK_NOTIFICATION_FAIL';
export const FETCH_PRODUCT_IN_STOCK_NOTIFICATION_RESET = 'FETCH_PRODUCT_IN_STOCK_NOTIFICATION_RESET';

export const fetchProductInStockNotification = (data: any) => ({
  type: FETCH_PRODUCT_IN_STOCK_NOTIFICATION,
  payload: data,
});

export const fetchProductInStockNotificationSuccess = (data: any) => ({
  type: FETCH_PRODUCT_IN_STOCK_NOTIFICATION_SUCCESS,
  payload: data,
});

export const fetchProductInStockNotificationStarted = () => ({
  type: FETCH_PRODUCT_IN_STOCK_NOTIFICATION_STARTED,
});

export const fetchProductInStockNotificationFail = (error: any) => ({
  type: FETCH_PRODUCT_IN_STOCK_NOTIFICATION_FAIL,
  payload: error,
});

export const fetchProductInStockNotificationReset = () => ({
  type: FETCH_PRODUCT_IN_STOCK_NOTIFICATION_RESET,
});
