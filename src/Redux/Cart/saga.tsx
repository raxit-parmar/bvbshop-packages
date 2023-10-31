import { put, takeEvery } from 'redux-saga/effects';

import {
  ADD_ITEM_TO_CART,
  APPLY_COUPON_CODE,
  cartFail,
  cartProcessStarted,
  cartSuccess,
  FETCH_CART,
  FETCH_CART_RELATED_PRODUCTS,
  fetchCartRelatedProductsFail,
  fetchCartRelatedProductsStarted,
  fetchCartRelatedProductsSuccess,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART,
} from './actions';
import { addItem, applyCoupon, getCart, getCartRelatedProducts, removeItem, updateItem } from './api';
import { deepClone } from '../../Utils';

// fetch cart detail
export function* sagaFetchCart(action: any) {
  yield put(cartProcessStarted());
  try {
    const data = yield getCart(action.payload);
    yield put(cartSuccess(data));
  } catch (e) {
    yield put(cartFail(e.message));
  }
}

// add item to cart
export function* sagaAddItemToCart(action: any) {
  yield put(cartProcessStarted());
  try {
    const payload = deepClone(action.payload);
    // LKNLSPR-719: When add/update item into cart post_item function will get both so we can use all data into datalayer
    if (typeof payload?.post_item === 'function') {
      delete payload.post_item;
      delete payload.addedProduct;
    }
    const data = yield addItem(payload);
    yield put(cartSuccess(data));
    if (typeof action?.payload?.post_item === 'function') {
      let item: any = null;
      if (data?.cartItems?.length > 0) {
          // tslint:disable-next-line:ter-indent
          item = data?.cartItems.find((ci: any) => ci?.products_id === action.payload.payload.itemId);
      }
      action?.payload?.post_item({ product: action?.payload?.addedProduct, cartItem: item });
    }
  } catch (e) {
    yield put(cartFail(e.message));
  }
}

// update cart
export function* sagaUpdateCart(action: any) {
  yield put(cartProcessStarted());
  try {
    const payload = deepClone(action.payload);
    // LKNLSPR-719: When add/update item into cart post_item function will get both so we can use all data into datalayer
    if (typeof payload?.post_item === 'function') {
      delete payload.post_item;
      delete payload.addedProduct;
    }
    const data = yield updateItem(action.payload);
    yield put(cartSuccess(data));
    if (typeof action?.payload?.post_item === 'function') {
      let item: any = null;
      if (data?.cartItems?.length > 0) {
          // tslint:disable-next-line:ter-indent
          item = data?.cartItems.find((ci: any) => ci?.products_id === action.payload.payload.itemId);
      }
      action?.payload?.post_item({ product: action?.payload?.addedProduct, cartItem: item });
    }
  } catch (e) {
    yield put(cartFail(e.message));
  }
}

// remove item from cart
export function* sagaRemoveItemFromCart(action: any) {
  yield put(cartProcessStarted());
  try {
    const data = yield removeItem(action.payload);
    yield put(cartSuccess(data));
  } catch (e) {
    yield put(cartFail(e.message));
  }
}

// Apply coupon code
export function* sagaApplyCouponCode(action: any) {
  yield put(cartProcessStarted());
  try {
    const data = yield applyCoupon(action.payload);
    yield put(cartSuccess(data));
  } catch (e) {
    // When applied coupon code is not correct we are fetching cart again and refresh the cart.
    yield sagaFetchCart({
      payload: {
        cartId: action.payload.cartId,
      },
    });
    yield put(cartFail(e.message));
  }
}

// Related Product
export function* sagaCartFetchRelatedProducts(action: any) {
  yield put(fetchCartRelatedProductsStarted());
  try {
    const data = yield getCartRelatedProducts(action.payload);
    yield put(fetchCartRelatedProductsSuccess(data));
  } catch (e) {
    yield put(fetchCartRelatedProductsFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_CART, sagaFetchCart);
  yield takeEvery(ADD_ITEM_TO_CART, sagaAddItemToCart);
  yield takeEvery(UPDATE_CART, sagaUpdateCart);
  yield takeEvery(REMOVE_ITEM_FROM_CART, sagaRemoveItemFromCart);
  yield takeEvery(APPLY_COUPON_CODE, sagaApplyCouponCode);
  yield takeEvery(FETCH_CART_RELATED_PRODUCTS, sagaCartFetchRelatedProducts);
}
