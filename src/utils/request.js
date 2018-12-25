import qs from 'qs';
import {
  isFunction,
  isUndefined,
  isNumber,
  isString,
  isArray,
  get,
} from 'lodash';
import { getToken, getPid, logoutURL, removeToken } from './env';
import history from './history';
import { qualificationApplyPath } from './pathPattern';

const isObject = value => value !== null && typeof value === 'object';
const navigator = {
  toQualificationApply() {
    history.push(qualificationApplyPath());
  },
  logout() {
    removeToken();
    window.location.href = logoutURL;
  },
};
const errCodeMessages = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const responseTypes = {
  'application/json': 'json',
  'text/html': 'text',
  'Blob/File': 'blob',
  'application/vnd.ms-excel': 'blob',
  FormData: 'formData',
  ArrayBuffer: 'arrayBuffer',
};

const throwError = (response = {}) => {
  const errortext = errCodeMessages[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  console.warn(`"${response.url}"请求错误 ${response.status}: ${errortext}`);
  throw error;
};

const isResponseStatusOk = response => {
  const { status } = response;
  return (status >= 200 && status < 300) || status === 304;
};

class InterceptorsManager {
  constructor(interceptors) {
    this.interceptors = interceptors;
  }

  use(onFulfilled, onReject) {
    if (isFunction(onFulfilled)) {
      if (isUndefined(onReject)) {
        this.interceptors.push(onFulfilled);
        return this.interceptors.length - 1;
      }
      if (isFunction(onReject)) {
        this.interceptors.push({ onFulfilled, onReject });
        return this.interceptors.length - 1;
      }
    }
    return -1;
  }

  eject(id) {
    if (isNumber(id) && id >= 0 && id < this.interceptors.length) {
      this.interceptors.splice(id, 1);
    }
  }

  compose(promise, additionalInterceptors = []) {
    return additionalInterceptors
      .concat(this.interceptors)
      .reduce((access, interceptor) => {
        if (isObject(interceptor)) {
          return access.then(interceptor.onFulfilled, interceptor.onReject);
        }

        if (isFunction(interceptor)) {
          return access.then(interceptor);
        }
        return access;
      }, promise);
  }
}

class Request {
  constructor(opts = {}) {
    const { transformRequest = [], transformResponse = [] } = opts;
    this.interceptors = {
      request: new InterceptorsManager(transformRequest),
      response: new InterceptorsManager(transformResponse),
    };

    ['get', 'post', 'put', 'patch', 'head', 'delete'].forEach(name => {
      this[name] = (url, options = {}) =>
        this.send({ url, ...options, method: name.toUpperCase() });
    });
  }

  send(opts = {}) {
    const { transformRequest, transformResponse, ...config } = opts;
    let promise = Promise.resolve(config);
    promise = this.interceptors.request.compose(
      promise,
      transformRequest
    );
    promise = promise.then(({ url, ...options }) => fetch(url, options));
    promise = this.interceptors.response.compose(
      promise,
      transformResponse
    );
    return promise;
  }
}

//* ************request interceptors start */
function auth(config) {
  // eslint-disable-next-line no-param-reassign
  config.headers = Object.assign(config.headers || {}, {
    authorization: `Bearer ${getToken()}`,
    pid: getPid() || 1254,
    wid: window.wid,
  });
  return config;
}

class MobxGetter {
  static stores = {};

  static pathsMap = {
    pid: ['SystemStore', 'pid'],
    storeId: ['SystemStore', 'storeId'],
    wid: ['SystemStore', 'wid'],
    fid: ['financeStore', 'fid'],
    supplierId: ['XinyunStore', 'supplierInfo', 'supplierId'],
  };

  static regist(stores) {
    MobxGetter.stores = stores;
  }

  static interceptor(config) {
    const { fromMobx, ...restConfig } = config;
    if (isObject(fromMobx)) {
      Object.keys(fromMobx).forEach(prop => {
        const mobxPaths = fromMobx[prop];
        if (isArray(mobxPaths)) {
          const values = {};
          mobxPaths.forEach(i => {
            if (MobxGetter.pathsMap[i]) {
              values[i] = get(MobxGetter.stores, MobxGetter.pathsMap[i]);
            }
          });
          restConfig[prop] = Object.assign(restConfig[prop] || {}, values);
        }
      });
    }
    return restConfig;
  }
}

function injectParams(config) {
  const { url, params } = config;
  if (isObject(params)) {
    // eslint-disable-next-line no-param-reassign
    config.url = url.replace(
      /:([a-z0-9_\-%]+)/gi,
      (source, $1) => params[$1] || ''
    );
  }
  return config;
}

function autoContentType(config) {
  const { body, method, query } = config;
  let { headers } = config;
  if (!isObject(headers)) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {};
    headers = config.headers;
  }
  if (!isString(headers['Content-Type'])) {
    if (method === 'POST' || method === 'PUT') {
      if (isObject(body)) {
        // eslint-disable-next-line no-param-reassign
        config.body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json; charset=utf-8';
      }
    }
    if (isObject(query)) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  } else if (body instanceof FormData) {
    delete headers['Content-Type'];
  }
  return config;
}

function serializeQuery(config) {
  const { url, query } = config;
  if (isObject(query)) {
    const search = url.split('?')[1];
    // eslint-disable-next-line no-param-reassign
    config.url = url + (search ? '&' : '?') + qs.stringify(query);
  }
  return config;
}
//* ************request interceptors end */

//* ************response interceptors start */
function checkResponseStatus(response) {
  if (isResponseStatusOk(response)) {
    return response;
  }
  throwError(response);
  return null;
}

function autoResponseType(response) {
  const contentType = response.headers.get('content-type');
  let responseType = '';
  if (contentType) {
    // eslint-disable-next-line
    for (const key in responseTypes) {
      if (contentType.includes(key)) {
        responseType = responseTypes[key];
        break;
      }
    }
  }
  return responseType ? response[responseType]() : response;
}

function checkSession(response) {
  const code = parseInt(response.code, 10);
  if (code === 1041) {
    navigator.logout();
    throwError(response);
  }
  return response;
}

function checkSupplier(response) {
  const code = parseInt(response.code, 10);
  if (code >= 3800200150000 && code < 3800200160000) {
    navigator.toQualificationApply();
  }
  return response;
}
//* ************response interceptors end */

const request = new Request();

request.interceptors.request.use(auth);
request.interceptors.request.use(MobxGetter.interceptor);
request.interceptors.request.use(injectParams);
request.interceptors.request.use(autoContentType);
request.interceptors.request.use(serializeQuery);

request.interceptors.response.use(checkResponseStatus);
request.interceptors.response.use(autoResponseType);
request.interceptors.response.use(checkSession);
request.interceptors.response.use(checkSupplier);

export default request;
export { MobxGetter };
