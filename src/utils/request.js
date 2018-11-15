import 'whatwg-fetch';
import { getToken, getPid, logoutURL } from './env';
import history from './history';
import { qualificationApplyPath } from './pathPattern';

class Functor {
  constructor(value) {
    this.value = value;
  }

  map(fn, ...rest) {
    return new Functor(fn(this.value, ...rest));
  }
}

const setHeaders = options => {
  const token = getToken();
  return {
    ...options,
    headers: Object.assign(
      {
        ...options.headers,
        authorization: `Bearer ${token}`,
        pid: getPid(),
        wid: window.wid || '',
      },
      options.customContentType
        ? {}
        : { 'Content-Type': 'application/json;charset=utf-8' } // 文件上传
    ),
  };
};

const formatData = ({ method, data, customContentType = false, ...rest }) => {
  let body = data;
  if (/post/i.test(method) && !customContentType) {
    // 非上传
    body = JSON.stringify({
      ...body,
    });
  }
  return {
    ...rest,
    method,
    body,
    customContentType,
    credentials: 'include',
  };
};

async function requestDataProcess(url, options) {
  const newOptions = new Functor(options).map(formatData).map(setHeaders).value;
  const result = await fetch(`${url}`, newOptions).then(res => res.json());
  const errcode = parseInt(result.errcode, 10);
  const code = parseInt(result.code, 10);
  if (errcode && errcode === 1041) {
    // 登录信息失效
    window.location.href = logoutURL;
    throw new Error(result.errmsg || '网络异常，请稍后再试');
  }

  if (code && code >= 3800200150000 && code < 3800200160000) {
    // 未入驻
    // message.warning(result.message);
    history.push(qualificationApplyPath());
  }
  return result;
}

/**
 * options {method, data, headers}
 */
export default async function request(url, options) {
  return requestDataProcess(url, options);
}
