export const FETCH_WEBWINKELKEUR = 'FETCH_WEBWINKELKEUR';
export const FETCH_WEBWINKELKEUR_SUCCESS = 'FETCH_WEBWINKELKEUR_SUCCESS';

export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';

export const fetchWebWinkelkeur = (data: any) => ({
  type: FETCH_WEBWINKELKEUR,
  payload: data,
});

export const fetchWebWinkelkeurSuccess = (data: any) => ({
  type: FETCH_WEBWINKELKEUR_SUCCESS,
  payload: data,
});

export const fetchSettings = (data: any) => ({
  type: FETCH_SETTINGS,
  payload: data,
});

export const fetchSettingsSuccess = (data: any) => ({
  type: FETCH_SETTINGS_SUCCESS,
  payload: data,
});
