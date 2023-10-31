export const FETCH_MANUFACTURER = 'FETCH_MANUFACTURER';
export const FETCH_MANUFACTURER_STARTED = 'FETCH_MANUFACTURER_STARTED';
export const FETCH_MANUFACTURER_SUCCESS = 'FETCH_MANUFACTURER_SUCCESS';
export const FETCH_MANUFACTURER_FAIL = 'FETCH_MANUFACTURER_FAIL';
export const FETCH_MANUFACTURER_RESET = 'FETCH_MANUFACTURER_RESET';

export const fetchManufacturer = (data: any = {}) => ({
  type: FETCH_MANUFACTURER,
  payload: data,
});

export const fetchManufacturerStarted = () => ({
  type: FETCH_MANUFACTURER_STARTED,
});

export const fetchManufacturerSuccess = (data: any) => ({
  type: FETCH_MANUFACTURER_SUCCESS,
  payload: data,
});

export const fetchManufacturerFail = (error: any) => ({
  type: FETCH_MANUFACTURER_FAIL,
  payload: error,
});

export const fetchManufacturerReset = () => ({
  type: FETCH_MANUFACTURER_RESET,
});
