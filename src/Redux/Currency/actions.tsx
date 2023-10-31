export const FETCH_CURRENCY_RATE = 'FETCH_CURRENCY_RATE';
export const FETCH_CURRENCY_RATE_STARTED = 'FETCH_CURRENCY_RATE_STARTED';
export const FETCH_CURRENCY_RATE_SUCCESS = 'FETCH_CURRENCY_RATE_SUCCESS';
export const FETCH_CURRENCY_RATE_FAIL = 'FETCH_CURRENCY_RATE_FAIL';
export const FETCH_CURRENCY_RATE_RESET = 'FETCH_CURRENCY_RATE_RESET';

export const fetchCurrencyRate = (data: any) => ({
  type: FETCH_CURRENCY_RATE,
  payload: data,
});

export const fetchCurrencyRateStarted = () => ({
  type: FETCH_CURRENCY_RATE_STARTED,
});

export const fetchCurrencyRateSuccess = (data: any) => ({
  type: FETCH_CURRENCY_RATE_SUCCESS,
  payload: data,
});

export const fetchCurrencyRateFail = (error: any) => ({
  type: FETCH_CURRENCY_RATE_FAIL,
  payload: error,
});

export const fetchCurrencyRateReset = () => ({
  type: FETCH_CURRENCY_RATE_RESET,
});
