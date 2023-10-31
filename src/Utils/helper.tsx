import axios, { AxiosInstance, Method } from 'axios';
import { DeviceDetection } from '../Utils';
import { bvbCache } from './cache';

let axiosInstance = null;
let apiQueue = [];
const CancelToken = axios.CancelToken;
declare const window;

const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const UcFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const GetNonce = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// REF: https://github.com/mohitgupta8888/react-currency-format/blob/react-currency-format/src/utils.js
/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
const limitToScale = (numStr: string, scale: number, fixedDecimalScale: boolean) => {
  let str = '';
  const filler = fixedDecimalScale ? '0' : '';
  for (let i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
};

/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */
const roundToPrecision = (numStr: string, scale: number, fixedDecimalScale: boolean) => {
  const numberParts = numStr.split('.');
  const roundedDecimalParts = parseFloat(`0.${numberParts[1] || '0'}`)
    .toFixed(scale)
    .split('.');
  const intPart = numberParts[0]
    .split('')
    .reverse()
    .reduce((roundedStr, current, idx) => {
      if (roundedStr.length > idx) {
        return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);

  const decimalPart = limitToScale(roundedDecimalParts[1] || '', (numberParts[1] || '').length, fixedDecimalScale);

  return intPart + (decimalPart ? '.' + decimalPart : '');
};

const getDescendantProp = (obj, desc) => {
  const arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
};

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

const generateQueryString = (queryObject) => {
  let queryString = '';
  if (queryObject) {
    const queryKeys = Object.keys(queryObject);
    // eslint-disable-next-line
    queryKeys.forEach((key, index) => {
      if (queryObject[key]) {
        if (queryObject[key].toString().length) {
          if (isNumber(queryObject[key])) {
            queryString += `${key}=${queryObject[key]}&`;
          } else {
            queryString += `${key}=${encodeURIComponent(queryObject[key])}&`;
          }
        }
      }
    });
    if (queryKeys.length > 0 && queryString[queryString.length - 1] === '&') {
      queryString = queryString.slice(0, -1);
    }
  }
  return queryString;
};

const parseQueryString = (queryString) => {
  const search = queryString.substring(1);
  try {
    if (search) {
      return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};

const parseCookies = (cookies) => {
  return cookies.split(';').reduce((res, c) => {
    const [key, val] = c.trim().split('=').map(decodeURIComponent);
    const allNumbers = (str) => /^\d+$/.test(str);
    try {
      return Object.assign(res, { [key]: allNumbers(val) ? val : JSON.parse(val) });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
};

const removeEmpty = (obj) => {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === '' ||
      (Array.isArray(obj[propName]) && !obj[propName].length)
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const downloadBlobToFile = (blob, fileName) => {
  try {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.log(e);
  }
};

const API = (force = false, defaultHeaders = {}): AxiosInstance => {
  if (axiosInstance && !force) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: defaultHeaders,
  });

  return axiosInstance;
};

interface FetchOptionsProps {
  method?: Method;
  body?: any;
  headers?: any;
  cache?: boolean;
  cacheTTL?: number; // in second
  queryParams?: any;
  json?: boolean;
  preCache?: boolean;
  preCacheTTL?: boolean;
  isAPIQueue?: boolean;
  apiInstance?: AxiosInstance;
}

const fetch: (url: string, options?: FetchOptionsProps) => any = async (url, options = {}) => {
  const {
    method = 'GET',
    body = {},
    headers = {},
    queryParams = {},
    cache = false,
    cacheTTL,
    preCache = false,
    preCacheTTL,
    json = true,
    isAPIQueue = false,
  } = options;
  let { apiInstance } = options;
  if (!apiInstance) {
    apiInstance = API();
  }
  let finalUrl;
  if (url.indexOf('http') !== -1) {
    finalUrl = `${process.env.API_ENDPOINT}${url}`;
  } else {
    finalUrl = `${url}`;
  }

  if (queryParams) {
    const queryString = generateQueryString(queryParams);
    if (queryString) {
      finalUrl = `${finalUrl}?${queryString}`;
    }
  }

  if (!preCache) {
    headers['__ftlshop__cache'] = cache;
    if (cacheTTL) {
      headers['__ftlshop__cacheTTL'] = cacheTTL;
    }
  }

  let cacheKey = '';
  if (preCache) {
    cacheKey = Buffer.from(
      JSON.stringify({
        finalUrl,
        body,
        headers,
      }),
    ).toString('base64');
    const cacheData = await bvbCache.get(cacheKey);
    if (cacheData) {
      return cacheData;
    }
  }

  let queueUrl;
  let bodyString;
  let cancelToken = null;
  if (isAPIQueue) {
    if (url.indexOf('http') !== -1) {
      queueUrl = `${process.env.API_ENDPOINT}${url}`;
    } else {
      queueUrl = `${url}`;
    }

    if (queryParams) {
      const tempQueryParams = deepClone(queryParams || {});
      const queryString = generateQueryString(tempQueryParams);
      if (queryString) {
        queueUrl = `${queueUrl}?${queryString}`;
      }
    }

    if (method.toLowerCase() === 'post') {
      const tempBody = deepClone(body || {});
      bodyString = generateQueryString(tempBody);
    }

    const queueObject = {
      method,
      bodyString,
      url: queueUrl,
      cancelTokenSource: null,
    };

    if (typeof window !== 'undefined') {
      queueObject.cancelTokenSource = CancelToken.source();
      cancelToken = queueObject.cancelTokenSource.token;
      apiQueue.forEach((aq) => {
        if (aq.url === queueUrl && aq.method === method) {
          aq.cancelTokenSource.cancel();
        }
      });
      apiQueue.push(queueObject);
    }
  }

  try {
    const response = await apiInstance.request({
      method,
      url,
      headers,
      cancelToken,
      data: body,
      params: queryParams,
      responseType: json ? 'json' : 'blob',
    });
    const res = response.data;
    if (typeof window !== 'undefined') {
      apiQueue = apiQueue.filter((aq) => !(aq.url === queueUrl && aq.method === method));
      if (process.env.AB_TESTING_RES_HEADER_KEY !== '') {
        const headerKey = `${process.env.AB_TESTING_RES_HEADER_KEY}`;
        const headers: any = deepClone(response.headers);
        if (headers && headers[headerKey]) {
          window.sessionStorage.setItem(headerKey, headers[headerKey]);
        }
      }
    }
    if (preCache) {
      if (preCacheTTL) {
        await bvbCache.set(cacheKey, res, preCacheTTL);
      } else {
        await bvbCache.set(cacheKey, res);
      }
    }
    return res;
  } catch (error) {
    if (typeof window !== 'undefined') {
      apiQueue = apiQueue.filter((aq) => !(aq.url === url && aq.method === method));
    }
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message || 'Bad response from server');
    } else {
      throw new Error(error.message || 'Bad response from server');
    }
  }
};

const bvbURIEncode = (str = '') => {
  return escape(encodeURIComponent(str));
};

const getFlatArray = (arr, key) => {
  return arr
    .map((f) => f[key])
    .filter((f) => f)
    .reduce((l, n) => l.concat(n), []);
};

const generateSearchUrl = (endPoint, searchObj) => {
  let url = endPoint;
  if (Object.keys(searchObj).length > 0) {
    Object.keys(searchObj).forEach((key) => {
      if (searchObj[key]) {
        if (key === 'attributes') {
          let opString = '';
          Object.keys(searchObj[key]).forEach((obKey) => {
            opString += `${obKey}:${searchObj[key][obKey].join(';')}|`;
          });
          if (opString) {
            opString = opString.substring(0, opString.length - 1);
            url += url.indexOf('?') === -1 ? '?' : '&';
            url += `op=${opString}`;
          }
        } else if (key === 'price') {
          if (searchObj[key]['from'] !== '' || searchObj[key]['to'] !== '') {
            url += url.indexOf('?') === -1 ? '?' : '&';
            url += `price=${searchObj[key]['from'] || 0}-${searchObj[key]['to'] || 0}`;
          }
        } else {
          if ((key === 'page' && searchObj[key] > 1) || key !== 'page') {
            url += url.indexOf('?') === -1 ? '?' : '&';
            url += `${key}=${bvbURIEncode(searchObj[key])}`;
          }
        }
      }
    });
  }
  return url;
};

// REF: https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
const getClosest = (elem, selector) => {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};

const onModalOpen = () => {
  const deviceDetection = new DeviceDetection(window.navigator.userAgent);
  if (deviceDetection.isIOS || deviceDetection.isIOS13) {
    window.scrollPosition = window.scrollY;
    window.locationHref = location.href;
    document.getElementsByTagName('html')[0].style.marginTop = `-${window.scrollPosition}px`;
    document.getElementsByTagName('html')[0].className = `${
      document.getElementsByTagName('html')[0].className
    } overlayActive`;
  }
};

const onModalClose = () => {
  const deviceDetection = new DeviceDetection(window.navigator.userAgent);
  if (deviceDetection.isIOS || deviceDetection.isIOS13) {
    document.getElementsByTagName('html')[0].className = `${document
      .getElementsByTagName('html')[0]
      .className.replace('overlayActive', '')}`;
    document.getElementsByTagName('html')[0].style.marginTop = '0';
    if (window.locationHref === location.href) {
      window.scrollTo(0, window.scrollPosition);
    }
    window.scrollPosition = null;
  }
};

const getObject = (obj: any, key: any) => {
  return key.split('.').reduce((o: any, x: any) => {
    return o === undefined || o === null ? o : o[x];
  }, obj);
};

const trimString = (str: string) => {
  return str.replace(/  +/g, ' ').trim();
};

const formatName = (obj: any = {}) => {
  return trimString(`${obj.firstName || ''} ${obj.middleName || ''} ${obj.lastName || ''}`);
};

const shortString = (string, limit, isDot?: boolean) => {
  if (string.length > limit) {
    return `${string.substring(0, limit)}${isDot ? '...' : ''}`;
  }
  return string;
};

const handleHrefBuilder = (page: number, location: any) => {
  if (location) {
    let queryParams = parseQueryString(location.search || '');
    queryParams = { ...queryParams, page };
    const url = generateSearchUrl(location.pathname, queryParams);
    return url;
  }
};

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const getPreCanonicalURL = (canonicalUrl?: string, appendURL?: string) => {
  let preCanonicalURL = canonicalUrl || '';
  const preURL = appendURL || process.env.ENDPOINT;
  if (preCanonicalURL) {
    if (!(preCanonicalURL.indexOf('http://') === 0 || preCanonicalURL.indexOf('https://') === 0)) {
      preCanonicalURL = `${preURL}/${preCanonicalURL}`;
    }
  }
  return preCanonicalURL;
};

export {
  roundHalf,
  UcFirst,
  GetNonce,
  limitToScale,
  roundToPrecision,
  getDescendantProp,
  generateQueryString,
  parseQueryString,
  parseCookies,
  removeEmpty,
  deepClone,
  downloadBlobToFile,
  fetch,
  API,
  axiosInstance,
  getFlatArray,
  generateSearchUrl,
  getClosest,
  onModalOpen,
  onModalClose,
  getObject,
  trimString,
  formatName,
  shortString,
  handleHrefBuilder,
  shuffle,
  getPreCanonicalURL,
  bvbURIEncode,
};
