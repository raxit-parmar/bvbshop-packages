import { put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_ALSO_BOUGHT,
  FETCH_PRODUCT_BUNDLE,
  FETCH_PRODUCT_FILTER,
  FETCH_PRODUCT_IN_STOCK_NOTIFICATION,
  FETCH_PRODUCT_REVIEWS,
  FETCH_RELATED_PRODUCT,
  FETCH_WISHLIST_PRODUCTS,
  fetchProductAlsoBoughtFail,
  fetchProductAlsoBoughtStarted,
  fetchProductAlsoBoughtSuccess,
  fetchProductBundleFail,
  fetchProductBundleStarted,
  fetchProductBundleSuccess,
  fetchProductFail,
  fetchProductFilterFail,
  fetchProductFilterStarted,
  fetchProductFilterSuccess,
  fetchProductInStockNotificationFail,
  fetchProductInStockNotificationStarted,
  fetchProductInStockNotificationSuccess,
  fetchProductReviewsFail,
  fetchProductReviewsStarted,
  fetchProductReviewsSuccess,
  fetchProductStarted,
  fetchProductSuccess,
  fetchRelatedProductFail,
  fetchRelatedProductStarted,
  fetchRelatedProductSuccess,
  fetchWishlistProductsFail,
  fetchWishlistProductsStarted,
  fetchWishlistProductsSuccess,
  REMOVE_WISHLIST_PRODUCT,
  WISHLIST_PRODUCT,
  FETCH_PRODUCT_FAQS,
  fetchProductFAQsStarted,
  fetchProductFAQsSuccess,
  fetchProductFAQsFail,
} from './actions';
import {
  getProduct,
  getProductAlsoBought,
  getProductBundle,
  getProductFaqs,
  getProductFilter,
  getProductReviews,
  getRelatedProduct,
  getWishlistProductsAPI,
  inStockNotification,
  removeWishlistProductAPI,
  wishlistProductAPI,
} from './api';

export function* sagaFetchProduct(action: any) {
  yield put(fetchProductStarted());
  try {
    const data = yield getProduct(action.payload);
    yield put(fetchProductSuccess(data));
  } catch (e) {
    yield put(fetchProductFail(e.message));
  }
}

// Product Bundle
export function* sagaFetchProductBundle(action: any) {
  yield put(fetchProductBundleStarted());
  try {
    const data = yield getProductBundle(action.payload);
    yield put(fetchProductBundleSuccess(data));
  } catch (e) {
    yield put(fetchProductBundleFail(e.message));
  }
}

// Product Also Bought
export function* sagaFetchProductAlsoBought(action: any) {
  yield put(fetchProductAlsoBoughtStarted());
  try {
    const data = yield getProductAlsoBought(action.payload);
    yield put(fetchProductAlsoBoughtSuccess(data));
  } catch (e) {
    yield put(fetchProductAlsoBoughtFail(e.message));
  }
}

// Related Product
export function* sagaFetchRelatedProduct(action: any) {
  yield put(fetchRelatedProductStarted());
  try {
    const data = yield getRelatedProduct(action.payload);
    yield put(fetchRelatedProductSuccess(data));
  } catch (e) {
    yield put(fetchRelatedProductFail(e.message));
  }
}

// Product Reviews
export function* sagaFetchProductReviews(action: any) {
  yield put(fetchProductReviewsStarted());
  try {
    const data = yield getProductReviews(action.payload);
    yield put(fetchProductReviewsSuccess(data));
  } catch (e) {
    yield put(fetchProductReviewsFail(e.message));
  }
}

// Product FAQs
export function* sagaFetchProductFAQs(action: any) {
  yield put(fetchProductFAQsStarted());
  try {
    const data = yield getProductFaqs(action.payload);
    yield put(fetchProductFAQsSuccess(data));
  } catch (e) {
    yield put(fetchProductFAQsFail(e.message));
  }
}

// wishlist product
export function* sagaWishlistProduct(action: any) {
  yield wishlistProductAPI(action.payload);
}

// remove wishlist product
export function* sagaRemoveWishlistProduct(action: any) {
  yield removeWishlistProductAPI(action.payload);
}

// Product Reviews
export function* sagaFetchWishlistProduct(action: any) {
  yield put(fetchWishlistProductsStarted());
  try {
    const data = yield getWishlistProductsAPI(action.payload);
    yield put(fetchWishlistProductsSuccess(data));
  } catch (e) {
    yield put(fetchWishlistProductsFail(e.message));
  }
}

// Product Reviews
export function* sagaFetchProductFilter(action: any) {
  yield put(fetchProductFilterStarted());
  try {
    const data = yield getProductFilter(action.payload);
    yield put(fetchProductFilterSuccess(data));
  } catch (e) {
    yield put(fetchProductFilterFail(e.message));
  }
}

// Fetch product in stock notification
export function* sageFetchProductInStockNotification(action: any) {
  yield put(fetchProductInStockNotificationStarted());
  try {
    const data = yield inStockNotification(action.payload);
    yield put(fetchProductInStockNotificationSuccess(data));
  } catch (e) {
    yield put(fetchProductInStockNotificationFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_PRODUCT, sagaFetchProduct);
  // Product Bundle
  yield takeEvery(FETCH_PRODUCT_BUNDLE, sagaFetchProductBundle);
  // Product Also Bought
  yield takeEvery(FETCH_PRODUCT_ALSO_BOUGHT, sagaFetchProductAlsoBought);
  // Related Products
  yield takeEvery(FETCH_RELATED_PRODUCT, sagaFetchRelatedProduct);
  // Product Reviews
  yield takeEvery(FETCH_PRODUCT_REVIEWS, sagaFetchProductReviews);
  // Product FAQs
  yield takeEvery(FETCH_PRODUCT_FAQS, sagaFetchProductFAQs);
  // wishlist product
  yield takeEvery(WISHLIST_PRODUCT, sagaWishlistProduct);
  // remove wishlist product
  yield takeEvery(REMOVE_WISHLIST_PRODUCT, sagaRemoveWishlistProduct);
  // get wishlist products
  yield takeEvery(FETCH_WISHLIST_PRODUCTS, sagaFetchWishlistProduct);
  // Product Bundle
  yield takeEvery(FETCH_PRODUCT_FILTER, sagaFetchProductFilter);
  // Product In stock notification
  yield takeEvery(FETCH_PRODUCT_IN_STOCK_NOTIFICATION, sageFetchProductInStockNotification);
}
