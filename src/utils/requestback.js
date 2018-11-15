/* eslint-disable */
import 'whatwg-fetch';
import qs from 'qs';
import get from 'lodash/get';
import { hashStr } from './string';
import { getToken, getPid, logoutURL, removeToken } from './env';
import history from './history';
import { qualificationApplyPath } from './pathPattern';

//组合
function compose(...middleswares) {
  if (middleswares.length === 0) {
    return (fetch, url, options) => fetch(url, options);
  }
  return middleswares.reduce(
    (outer, inner) => (fetch, outerUrl, outerOptions) =>
      outer(
        (innerUrl, innerOptions) => inner(fetch, innerUrl, innerOptions),
        outerUrl,
        outerOptions
      )
  );
}
//网络错误状态码
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
//状态码判断
function isResponseStatusOk(response) {
  const { status } = response;
  return (status >= 200 && status < 300) || status === 304;
}
//response error抛出
function throwError(response = {}) {
  const errortext = errCodeMessages[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  console.warn(`"${response.url}"请求错误 ${response.status}: ${errortext}`);
  throw error;
}
//url参数填充 /person/:id + options.params={id:'1'} --> /person/1
const stringifyParams = (fetch, url, options) => {
  const { params } = options;
  if (typeof params === 'object') {
    url = url.replace(/:([a-z0-9_\-%]+)/gi, (source, $1) => params[$1] || '');
  }
  return fetch(url, options);
};
//url查询参数填充
const stringifyQuery = (fetch, url, options) => {
  const { query } = options;
  if (typeof query === 'object') {
    const search = url.split('?')[1];
    url = url + (search ? '&' : '?') + qs.stringify(query);
  }
  return fetch(url, options);
};
//自动添加headers的 “Content-Type”
const autoContentType = (fetch, url, options) => {
  const { body, method, query } = options;
  if (!options.headers) {
    options.headers = {};
  }
  if (!options.headers['Content-Type']) {
    if (method === 'POST' || method === 'PUT') {
      if (body instanceof FormData) {
        options.headers['Content-Type'] = 'multipart/form-data';
      } else if (body instanceof Object) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json; charset=utf-8';
      }
    }
    if (typeof query === 'object') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  }
  return fetch(url, options);
};

const responseTypes = {
  'application/json': 'json',
  'text/html': 'text',
  'Blob/File': 'blob',
  'application/vnd.ms-excel': 'blob',
  FormData: 'formData',
  ArrayBuffer: 'arrayBuffer',
};
//自动格式化response
const autoResponseType = response => {
  const contentType = response.headers.get('content-type');
  let responseType;
  if (contentType) {
    for (const key in responseTypes) {
      if (contentType.includes(key)) {
        responseType = responseTypes[key];
        break;
      }
    }
  }
  return responseType ? response[responseType]() : response;
};
//检查response状态码 原生fetch对于某些网络错误仍然会resolve
const checkResponseStatus = response => {
  if (isResponseStatusOk(response)) {
    return response;
  }
  throwError(response);
};
// 登录信息失效
function invalidSession(response) {
  const code = parseInt(response.code);
  if (code === 1041) {
    removeToken();
    window.location.href = logoutURL;
    response.statusText = '登录信息失效';
    throwError(response);
  }
  return response;
}
// 供货商未入驻
function invalidSupplier(response) {
  const code = parseInt(response.code);
  if (code >= 3800200150000 && code < 3800200160000) {
    history.push(qualificationApplyPath());
  }
  return response;
}
//预添加headers参数中间件的生成器
const setHeaders = (name, value) => (fetch, url, options) => {
  const finalValue = typeof value === 'function' ? value() : value;
  if (finalValue) {
    (options.headers || (options.headers = {}))[name] = finalValue;
  }
  return fetch(url, options);
};

class Request {
  constructor(requestMiddlewares, responseHandlers) {
    this.requestMiddlewares = requestMiddlewares || [];
    this.responseHandlers = responseHandlers || [];
    this.chain = compose(...this.requestMiddlewares);
    ['get', 'post', 'put', 'patch', 'head', 'delete'].forEach(method => {
      this[method] = (url, options, extraMiddlewares) =>
        this.fetch(
          url,
          { ...options, method: method.toUpperCase() },
          extraMiddlewares
        );
    });
  }

  header(name, value) {
    this.middleware(`headers.${name}`, setHeaders(name, value));
  }

  middleware(name, middleware) {
    const index = this.requestMiddlewares.findIndex(
      item => item.MIDDLEWARE_NAME === name
    );
    const middlewares = this.requestMiddlewares.slice(0);
    if (typeof middleware === 'function') {
      middleware.MIDDLEWARE_NAME = name;
      if (index === -1) {
        middlewares.push(middleware);
      } else {
        middlewares[index] = middleware;
      }
    } else if (index >= 0) {
      middlewares.splice(index, 1);
    }
    this.requestMiddlewares = middlewares;
    this.chain = compose(...this.requestMiddlewares);
  }

  fetch(url, options = {}, extraMiddlewares) {
    const { expires } = options;

    let cacheKey;
    let shouldCache = false;
    //{expires:5000} localStorage缓存5秒后过期
    if (typeof expires === 'number' && expires > 0) {
      cacheKey = hashStr(url);
      const cachedData = localStorage.getItem(cacheKey);
      const cachedDate = localStorage.getItem(`${cacheKey}:ms`);
      if (cachedData) {
        if (Date.now() - Number(cachedDate) < expires) {
          return Promise.resolve(JSON.parse(cachedData));
        }
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(`${cacheKey}:ms`);
        shouldCache = true;
      } else {
        shouldCache = true;
      }
    }
    let handlers = this.responseHandlers;
    let finalFetch = this.chain;
    if (extraMiddlewares) {
      if (typeof extraMiddlewares === 'function') {
        finalFetch = compose(
          extraMiddlewares,
          this.chain
        );
      } else if (Array.isArray(extraMiddlewares)) {
        finalFetch = compose(
          ...extraMiddlewares,
          this.chain
        );
      }
    }

    return finalFetch(
      global.fetch || window.fetch || Window.fetch,
      url,
      options
    ).then(response => {
      const contentType = response.headers.get('Content-Type');
      if (
        shouldCache &&
        contentType &&
        isResponseStatusOk(response) &&
        contentType.match(/application\/json/i)
      ) {
        response
          .clone()
          .json()
          .then(data => {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(`${cacheKey}:ms`, Date.now());
          });
      }
      if (!handlers || handlers.length === 0) {
        return response;
      }
      return handlers.reduce(
        (promise, hanler) => promise.then(hanler),
        Promise.resolve(response)
      );
    });
  }
}

const request = new Request(
  [stringifyParams, stringifyQuery, autoContentType],
  [checkResponseStatus, autoResponseType, invalidSession, invalidSupplier]
);
request.header('authorization', () => `Bearer ${getToken()}`);
request.header('pid', () => getPid());
request.header('wid', () => window.wid || '');

const mobxKeyPathsMap = {
  pid: 'SystemStore.pid',
  storeId: 'SystemStore.storeId',
  wid: 'SystemStore.wid',
  fid: 'financeStore.fid',
};
function registStores(stores) {
  request.stores = stores;
}
const formatValue = value => {
  const pathName = mobxKeyPathsMap[value];
  return typeof value === 'function'
    ? value(stores)
    : pathName && get(request.stores, pathName);
};
const createMiddleware = type => (setters, item) => (fetch, url, options) => {
  if (!options[type]) {
    options[type] = {};
  }
  if (typeof setters === 'string') {
    if (item) {
      options[type][setters] = formatValue(item) || item;
    } else {
      const finalValue = formatValue(setters);
      if (finalValue) {
        options[type][setters] = finalValue;
      }
    }
  } else if (Array.isArray(setters)) {
    setters.forEach(value => {
      const finalValue = formatValue(value);
      if (finalValue) {
        options[type][value] = finalValue;
      }
    });
  } else if (typeof setters === 'object') {
    Object.keys(setters).forEach(key => {
      const value = setters[key];
      options[type][key] = formatValue(value) || value;
    });
  }
  return fetch(url, options);
};

const extraQuery = createMiddleware('query');
const extraBody = createMiddleware('body');
const extraHeader = createMiddleware('headers');

export default request;
export { registStores, extraQuery, extraBody, extraHeader };
