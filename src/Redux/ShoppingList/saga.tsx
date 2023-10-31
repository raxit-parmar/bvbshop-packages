import { put, takeEvery } from 'redux-saga/effects';
import { fetchCart } from '../../Redux/Cart';
import {
  fetchAddProductToShoppingListDetailSuccess,
  fetchDeleteProductToShoppingListDetailSuccess,
  fetchShoppingListCreateSuccess,
  fetchShoppingListDeleteSuccess,
  fetchShoppingListFail,
  fetchShoppingListStarted,
  fetchShoppingListSuccess,
  fetchShoppingListUpdateSuccess,
  fetchUpdateProductToShoppingListDetailSuccess,
  FETCH_ADD_PRODUCTS_FROM_CART_TO_SHOPPING_LIST_DETAIL,
  FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL,
  FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL,
  FETCH_SHOPPING_LIST,
  FETCH_SHOPPING_LIST_CREATE,
  FETCH_SHOPPING_LIST_DELETE,
  FETCH_SHOPPING_LIST_UPDATE,
  FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL,
} from './actions';
import {
  addAllShoppingListProductsToCart,
  addProductToShoppingList,
  createShoppingList,
  deleteProductToShoppingList,
  deleteShoppingList,
  getAllShoppingList,
  updateProductToShoppingList,
  updateShoppingList,
} from './api';

export function* sagaFetchShoppingList(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield getAllShoppingList(action.payload);
    yield put(fetchShoppingListSuccess(data));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export function* sagaFetchShoppingListCreate(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield createShoppingList(action.payload);
    yield put(fetchShoppingListCreateSuccess(data));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export function* sagaFetchShoppingListUpdate(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield updateShoppingList(action.payload);
    yield put(fetchShoppingListUpdateSuccess(data));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export function* sagaFetchShoppingListDelete(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield deleteShoppingList(action.payload);
    yield put(fetchShoppingListDeleteSuccess(action.payload));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export function* sagaFetchAddProductToShoppingListDetail(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield addProductToShoppingList(action.payload);
    yield put(fetchAddProductToShoppingListDetailSuccess(data));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export function* sagaFetchUpdateProductToShoppingListDetail(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield updateProductToShoppingList(action.payload);
    yield put(fetchUpdateProductToShoppingListDetailSuccess(data));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export function* sagaFetchDeleteProductToShoppingListDetail(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield deleteProductToShoppingList(action.payload);
    yield put(fetchDeleteProductToShoppingListDetailSuccess(action.payload));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export function* sagaFetchAddAllShoppingListDetailProductsToCart(action: any) {
  yield put(fetchShoppingListStarted());
  try {
    const data = yield addAllShoppingListProductsToCart(action.payload);
    let cartId = action.payload.payload.cartId;
    if (data && data.cart_id) {
      cartId = data.cart_id;
    }
    yield put(fetchCart({ cartId }));
  } catch (e) {
    yield put(fetchShoppingListFail(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_SHOPPING_LIST, sagaFetchShoppingList);
  yield takeEvery(FETCH_SHOPPING_LIST_CREATE, sagaFetchShoppingListCreate);
  yield takeEvery(FETCH_SHOPPING_LIST_UPDATE, sagaFetchShoppingListUpdate);
  yield takeEvery(FETCH_SHOPPING_LIST_DELETE, sagaFetchShoppingListDelete);

  yield takeEvery(FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL, sagaFetchAddProductToShoppingListDetail);
  yield takeEvery(FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL, sagaFetchUpdateProductToShoppingListDetail);
  yield takeEvery(FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL, sagaFetchDeleteProductToShoppingListDetail);

  yield takeEvery(
    FETCH_ADD_PRODUCTS_FROM_CART_TO_SHOPPING_LIST_DETAIL,
    sagaFetchAddAllShoppingListDetailProductsToCart,
  );
}
