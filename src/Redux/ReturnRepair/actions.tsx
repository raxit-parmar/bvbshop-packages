// List
export const FETCH_RETURN_REPAIR_ORDER = 'FETCH_RETURN_REPAIR_ORDER';
export const FETCH_RETURN_REPAIR_ORDER_STARTED = 'FETCH_RETURN_REPAIR_ORDER_STARTED';
export const FETCH_RETURN_REPAIR_ORDER_SUCCESS = 'FETCH_RETURN_REPAIR_ORDER_SUCCESS';
export const FETCH_RETURN_REPAIR_ORDER_FAIL = 'FETCH_RETURN_REPAIR_ORDER_FAIL';
export const FETCH_RETURN_REPAIR_ORDER_RESET = 'FETCH_RETURN_REPAIR_ORDER_RESET';

export const fetchReturnRepairOrder = (data: any) => ({
  type: FETCH_RETURN_REPAIR_ORDER,
  payload: data,
});

export const fetchReturnRepairOrderStarted = () => ({
  type: FETCH_RETURN_REPAIR_ORDER_STARTED,
});

export const fetchReturnRepairOrderSuccess = (data: any) => ({
  type: FETCH_RETURN_REPAIR_ORDER_SUCCESS,
  payload: data,
});

export const fetchReturnRepairOrderFail = (error: any) => ({
  type: FETCH_RETURN_REPAIR_ORDER_FAIL,
  payload: error,
});

export const fetchReturnRepairOrderReset = () => ({
  type: FETCH_RETURN_REPAIR_ORDER_RESET,
});

// Detail
export const FETCH_RETURN_REPAIR_ORDER_DETAIL = 'FETCH_RETURN_REPAIR_ORDER_DETAIL';
export const FETCH_RETURN_REPAIR_ORDER_DETAIL_STARTED = 'FETCH_RETURN_REPAIR_ORDER_DETAIL_STARTED';
export const FETCH_RETURN_REPAIR_ORDER_DETAIL_SUCCESS = 'FETCH_RETURN_REPAIR_ORDER_DETAIL_SUCCESS';
export const FETCH_RETURN_REPAIR_ORDER_DETAIL_FAIL = 'FETCH_RETURN_REPAIR_ORDER_DETAIL_FAIL';
export const FETCH_RETURN_REPAIR_ORDER_DETAIL_RESET = 'FETCH_RETURN_REPAIR_ORDER_DETAIL_RESET';

export const fetchReturnRepairOrderDetail = (data: any) => ({
  type: FETCH_RETURN_REPAIR_ORDER_DETAIL,
  payload: data,
});

export const fetchReturnRepairOrderDetailStarted = () => ({
  type: FETCH_RETURN_REPAIR_ORDER_DETAIL_STARTED,
});

export const fetchReturnRepairOrderDetailSuccess = (data: any) => ({
  type: FETCH_RETURN_REPAIR_ORDER_DETAIL_SUCCESS,
  payload: data,
});

export const fetchReturnRepairOrderDetailFail = (error: any) => ({
  type: FETCH_RETURN_REPAIR_ORDER_DETAIL_FAIL,
  payload: error,
});

export const fetchReturnRepairOrderDetailReset = () => ({
  type: FETCH_RETURN_REPAIR_ORDER_DETAIL_RESET,
});

// Create
export const CREATE_RETURN_REPAIR_REQUEST = 'CREATE_RETURN_REPAIR_REQUEST';
export const CREATE_RETURN_REPAIR_REQUEST_STARTED = 'CREATE_RETURN_REPAIR_REQUEST_STARTED';
export const CREATE_RETURN_REPAIR_REQUEST_SUCCESS = 'CREATE_RETURN_REPAIR_REQUEST_SUCCESS';
export const CREATE_RETURN_REPAIR_REQUEST_FAIL = 'CREATE_RETURN_REPAIR_REQUEST_FAIL';
export const CREATE_RETURN_REPAIR_REQUEST_RESET = 'CREATE_RETURN_REPAIR_REQUEST_RESET';

export const createReturnRepairRequest = (data: any) => ({
  type: CREATE_RETURN_REPAIR_REQUEST,
  payload: data,
});

export const createReturnRepairRequestStarted = () => ({
  type: CREATE_RETURN_REPAIR_REQUEST_STARTED,
});

export const createReturnRepairRequestSuccess = (data: any) => ({
  type: CREATE_RETURN_REPAIR_REQUEST_SUCCESS,
  payload: data,
});

export const createReturnRepairRequestFail = (error: any) => ({
  type: CREATE_RETURN_REPAIR_REQUEST_FAIL,
  payload: error,
});

export const createReturnRepairRequestReset = () => ({
  type: CREATE_RETURN_REPAIR_REQUEST_RESET,
});
