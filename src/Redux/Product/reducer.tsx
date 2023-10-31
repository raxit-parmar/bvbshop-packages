import _ from 'lodash';

import { deepClone } from '../../Utils';
import {
  FETCH_PRODUCT_ALSO_BOUGHT_FAIL,
  FETCH_PRODUCT_ALSO_BOUGHT_RESET,
  FETCH_PRODUCT_ALSO_BOUGHT_STARTED,
  FETCH_PRODUCT_ALSO_BOUGHT_SUCCESS,
  FETCH_PRODUCT_BUNDLE_FAIL,
  FETCH_PRODUCT_BUNDLE_RESET,
  FETCH_PRODUCT_BUNDLE_STARTED,
  FETCH_PRODUCT_BUNDLE_SUCCESS,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_FAQS_FAIL,
  FETCH_PRODUCT_FAQS_RESET,
  FETCH_PRODUCT_FAQS_STARTED,
  FETCH_PRODUCT_FAQS_SUCCESS,
  FETCH_PRODUCT_FILTER_FAIL,
  FETCH_PRODUCT_FILTER_ON_CHECKED,
  FETCH_PRODUCT_FILTER_RESET,
  FETCH_PRODUCT_FILTER_STARTED,
  FETCH_PRODUCT_FILTER_SUCCESS,
  FETCH_PRODUCT_IN_STOCK_NOTIFICATION,
  FETCH_PRODUCT_IN_STOCK_NOTIFICATION_FAIL,
  FETCH_PRODUCT_IN_STOCK_NOTIFICATION_RESET,
  FETCH_PRODUCT_IN_STOCK_NOTIFICATION_SUCCESS,
  FETCH_PRODUCT_RESET,
  FETCH_PRODUCT_REVIEWS_FAIL,
  FETCH_PRODUCT_REVIEWS_RESET,
  FETCH_PRODUCT_REVIEWS_STARTED,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  FETCH_RELATED_PRODUCT_FAIL,
  FETCH_RELATED_PRODUCT_RESET,
  FETCH_RELATED_PRODUCT_STARTED,
  FETCH_RELATED_PRODUCT_SUCCESS,
  FETCH_WISHLIST_PRODUCTS_FAIL,
  FETCH_WISHLIST_PRODUCTS_RESET,
  FETCH_WISHLIST_PRODUCTS_STARTED,
  FETCH_WISHLIST_PRODUCTS_SUCCESS,
} from './actions';

const initialProductState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialProductState = () => deepClone(initialProductState);

export const product = (state = getInitialProductState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCT_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCT_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCT_RESET:
      return getInitialProductState();
    default:
      return state;
  }
};

// Product Bundle
const initialProductBundleState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialProductBundleState = () => deepClone(initialProductBundleState);

export const productBundle = (state = getInitialProductBundleState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_BUNDLE_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCT_BUNDLE_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCT_BUNDLE_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCT_BUNDLE_RESET:
      return getInitialProductBundleState();
    default:
      return state;
  }
};

// Product Also Bought
const initialProductAlsoBoughtState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialProductAlsoBoughtState = () => deepClone(initialProductAlsoBoughtState);

export const productAlsoBought = (state = getInitialProductAlsoBoughtState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_ALSO_BOUGHT_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCT_ALSO_BOUGHT_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCT_ALSO_BOUGHT_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCT_ALSO_BOUGHT_RESET:
      return getInitialProductAlsoBoughtState();
    default:
      return state;
  }
};

// Related Product
const initialRelatedProductState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialRelatedProductState = () => deepClone(initialRelatedProductState);

export const relatedProduct = (state = getInitialRelatedProductState(), action: any) => {
  switch (action.type) {
    case FETCH_RELATED_PRODUCT_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_RELATED_PRODUCT_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_RELATED_PRODUCT_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_RELATED_PRODUCT_RESET:
      return getInitialRelatedProductState();
    default:
      return state;
  }
};

// Product FAQs
const initialProductFAQsState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialProductFAQsState = () => deepClone(initialProductFAQsState);

export const productFAQs = (state = getInitialProductFAQsState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_FAQS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCT_FAQS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCT_FAQS_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCT_FAQS_RESET:
      return getInitialProductFAQsState();
    default:
      return state;
  }
};

// Product Reviews
const initialProductReviewsState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialProductReviewsState = () => deepClone(initialProductReviewsState);

export const productReviews = (state = getInitialProductReviewsState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_REVIEWS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCT_REVIEWS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCT_REVIEWS_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCT_REVIEWS_RESET:
      return getInitialProductReviewsState();
    default:
      return state;
  }
};

// Product Reviews
const initialWishlistProductsState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialWishlistProductsState = () => deepClone(initialWishlistProductsState);

export const wishlistProducts = (state = getInitialWishlistProductsState(), action: any) => {
  switch (action.type) {
    case FETCH_WISHLIST_PRODUCTS_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_WISHLIST_PRODUCTS_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_WISHLIST_PRODUCTS_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_WISHLIST_PRODUCTS_RESET:
      return getInitialWishlistProductsState();
    default:
      return state;
  }
};

// Get Product Filter
export interface ProductFilterRequestModal {
  [key: string]: any;
  price?: {
    from?: number | string;
    to?: number | string;
  };
  attributes?: any;
  categoryId?: string;
  manufacturerId?: string;
  search?: string;
}

const initialProductFilterState: {
  data: any[];
  error: string;
  isLoading: boolean;
} = {
  data: [],
  error: null,
  isLoading: false,
};

export const getInitialProductFilterState = () => deepClone(initialProductFilterState);

export const productFilter = (state = getInitialProductFilterState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_FILTER_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCT_FILTER_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCT_FILTER_ON_CHECKED:
      state.data.forEach((of) => {
        if (of.id == action.payload.parent) {
          of.children.forEach((ofc) => {
            if(of.type === 'radio'){
              ofc.checked = false;
            }
            if (ofc.id === action.payload.child) {
              ofc.checked = action.payload.checked;
            }
          });
        }
      });
      return _.assignIn({}, state, {
        data: state.data,
      });
    case FETCH_PRODUCT_FILTER_FAIL:
      return _.assignIn({}, state, {
        // data: [],
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCT_FILTER_RESET:
      return getInitialProductFilterState();
    default:
      return state;
  }
};

// In stock notification
const initialProductInStockNotificationState: any = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialProductInStockNotificationState = () => deepClone(initialProductInStockNotificationState);

export const productInStockNotification = (state = getInitialProductInStockNotificationState(), action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_IN_STOCK_NOTIFICATION:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_PRODUCT_IN_STOCK_NOTIFICATION_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case FETCH_PRODUCT_IN_STOCK_NOTIFICATION_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_PRODUCT_IN_STOCK_NOTIFICATION_RESET:
      return getInitialProductInStockNotificationState();
    default:
      return state;
  }
};
