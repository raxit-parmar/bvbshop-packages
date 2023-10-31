/**
 *
 * Shopping List
 */
export const FETCH_SHOPPING_LIST = 'FETCH_SHOPPING_LIST';
export const FETCH_SHOPPING_LIST_STARTED = 'FETCH_SHOPPING_LIST_STARTED';
export const FETCH_SHOPPING_LIST_SUCCESS = 'FETCH_SHOPPING_LIST_SUCCESS';
export const FETCH_SHOPPING_LIST_FAIL = 'FETCH_SHOPPING_LIST_FAIL';
export const FETCH_SHOPPING_LIST_RESET = 'FETCH_SHOPPING_LIST_RESET';

export const fetchShoppingList = (data: any = {}) => ({
  type: FETCH_SHOPPING_LIST,
  payload: data,
});

export const fetchShoppingListStarted = () => ({
  type: FETCH_SHOPPING_LIST_STARTED,
});

export const fetchShoppingListSuccess = (data: any) => ({
  type: FETCH_SHOPPING_LIST_SUCCESS,
  payload: data,
});

export const fetchShoppingListFail = (error: any) => ({
  type: FETCH_SHOPPING_LIST_FAIL,
  payload: error,
});

export const fetchShoppingListReset = () => ({
  type: FETCH_SHOPPING_LIST_RESET,
});

/**
 *
 * Shopping List Create
 */
export const FETCH_SHOPPING_LIST_CREATE = 'FETCH_SHOPPING_LIST_CREATE';
export const FETCH_SHOPPING_LIST_CREATE_SUCCESS = 'FETCH_SHOPPING_LIST_CREATE_SUCCESS';

export const fetchShoppingListCreate = (data: any) => ({
  type: FETCH_SHOPPING_LIST_CREATE,
  payload: data,
});

export const fetchShoppingListCreateSuccess = (data: any) => ({
  type: FETCH_SHOPPING_LIST_CREATE_SUCCESS,
  payload: data,
});

/**
 *
 * Shopping List Update
 */
export const FETCH_SHOPPING_LIST_UPDATE = 'FETCH_SHOPPING_LIST_UPDATE';
export const FETCH_SHOPPING_LIST_UPDATE_SUCCESS = 'FETCH_SHOPPING_LIST_UPDATE_SUCCESS';

export const fetchShoppingListUpdate = (data: any) => ({
  type: FETCH_SHOPPING_LIST_UPDATE,
  payload: data,
});

export const fetchShoppingListUpdateSuccess = (data: any) => ({
  type: FETCH_SHOPPING_LIST_UPDATE_SUCCESS,
  payload: data,
});

/**
 *
 * Shopping List Delete
 */
export const FETCH_SHOPPING_LIST_DELETE = 'FETCH_SHOPPING_LIST_DELETE';
export const FETCH_SHOPPING_LIST_DELETE_SUCCESS = 'FETCH_SHOPPING_LIST_DELETE_SUCCESS';

export const fetchShoppingListDelete = (data: any) => ({
  type: FETCH_SHOPPING_LIST_DELETE,
  payload: data,
});

export const fetchShoppingListDeleteSuccess = (data: any) => ({
  type: FETCH_SHOPPING_LIST_DELETE_SUCCESS,
  payload: data,
});


/**
 *
 *  Shopping List Detail
 */
export const FETCH_SHOPPING_LIST_DETAIL = 'FETCH_SHOPPING_LIST_DETAIL';
export const FETCH_SHOPPING_LIST_DETAIL_STARTED = 'FETCH_SHOPPING_LIST_DETAIL_STARTED';
export const FETCH_SHOPPING_LIST_DETAIL_SUCCESS = 'FETCH_SHOPPING_LIST_DETAIL_SUCCESS';
export const FETCH_SHOPPING_LIST_DETAIL_FAIL = 'FETCH_SHOPPING_LIST_DETAIL_FAIL';
export const FETCH_SHOPPING_LIST_DETAIL_RESET = 'FETCH_SHOPPING_LIST_DETAIL_RESET';


export const fetchShoppingListDetail = (data: any = {}) => ({
  type: FETCH_SHOPPING_LIST_DETAIL,
  payload: data,
});

export const fetchShoppingListDetailStarted = () => ({
  type: FETCH_SHOPPING_LIST_DETAIL_STARTED,
});

export const fetchShoppingListDetailSuccess = (data: any) => ({
  type: FETCH_SHOPPING_LIST_DETAIL_SUCCESS,
  payload: data,
});

export const fetchShoppingListDetailFail = (error: any) => ({
  type: FETCH_SHOPPING_LIST_DETAIL_FAIL,
  payload: error,
});

export const fetchShoppingListDetailReset = () => ({
  type: FETCH_SHOPPING_LIST_DETAIL_RESET,
});


/**
 *
 * Add Product Shopping List
 */
export const FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL = 'FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL';
export const FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS = 'FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS';

export const fetchAddProductToShoppingListDetail = (data: any) => ({
  type: FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL,
  payload: data,
});

export const fetchAddProductToShoppingListDetailSuccess = (data: any) => ({
  type: FETCH_ADD_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS,
  payload: data,
});

/**
 *
 * Update Product Shopping List
 */
export const FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL = 'FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL';
export const FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS = 'FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS';

export const fetchUpdateProductToShoppingListDetail = (data: any) => ({
  type: FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL,
  payload: data,
});

export const fetchUpdateProductToShoppingListDetailSuccess = (data: any) => ({
  type: FETCH_UPDATE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS,
  payload: data,
});

/**
 *
 * Delete Product Shopping List
 */
export const FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL = 'FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL';
export const FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS = 'FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS';

export const fetchDeleteProductToShoppingListDetail = (data: any) => ({
  type: FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL,
  payload: data,
});

export const fetchDeleteProductToShoppingListDetailSuccess = (data: any) => ({
  type: FETCH_DELETE_PRODUCT_TO_SHOPPING_LIST_DETAIL_SUCCESS,
  payload: data,
});

/**
 *
 * Add Product from cart to shopping list
 */
export const FETCH_ADD_PRODUCTS_FROM_CART_TO_SHOPPING_LIST_DETAIL = 'FETCH_ADD_PRODUCTS_FROM_CART_TO_SHOPPING_LIST_DETAIL';

export const fetchAddProductsFromCartToShoppingListDetail = (data: any) => ({
  type: FETCH_ADD_PRODUCTS_FROM_CART_TO_SHOPPING_LIST_DETAIL,
  payload: data,
});
