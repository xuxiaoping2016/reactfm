import * as Cookies from 'js-cookie';
import history from './history';

const SYSTEM_NAME = 'supplier';

const REGEXP_DOMAIN_DEV = new RegExp(
  `${SYSTEM_NAME}.console.dev.weimob.com`,
  'i'
);
const REGEXP_DOMAIN_QA = new RegExp(
  `${SYSTEM_NAME}.console.saas.weimobqa.com`,
  'i'
);
const REGEXP_DOMAIN_PL = new RegExp(
  `${SYSTEM_NAME}.console.pl.weimob.com`,
  'i'
);
const REGEXP_DOMAIN_ONLINE = new RegExp(
  `${SYSTEM_NAME}.console.weimob.com`,
  'i'
);

const { hostname } = window.location;
/* eslint-disable import/no-mutable-exports */
let env = 'dev'; // 应用环境
let dotENV = 'localhost'; // 打点环境
let logoutURL = '//account.dev.weimob.com/logout'; // 退出页面
let originDOMAIN = '//console.dev.weimob.com'; // 应用首页
let retailURL = '//retail.console.dev.weimob.com/#/app/';
let basicURL = '//basis.console.dev.weimob.com/#/app/';
let supplierURL = `//${SYSTEM_NAME}.console.dev.weimob.com/#/app/`;
let wisdomURL = '//wisdom.console.dev.weimob.com/#/';

// http://retail.console.weimob.com/#/app/100000199446/26051446/order/order/orderlist?page=1&count=20&orderStatuses=4

switch (true) {
  case REGEXP_DOMAIN_ONLINE.test(hostname): {
    env = 'online';
    dotENV = 'production';
    logoutURL = '//account.weimob.com/logout';
    originDOMAIN = '//console.weimob.com';
    retailURL = '//retail.console.weimob.com/#/app/';
    basicURL = '//basis.console.weimob.com/#/app/';
    supplierURL = `//${SYSTEM_NAME}.console.weimob.com/#/app/`;
    wisdomURL = '//wisdom.console.weimob.com/#/';
    break;
  }
  case REGEXP_DOMAIN_PL.test(hostname): {
    env = 'pl';
    dotENV = 'production';
    logoutURL = '//account.pl.weimob.com/logout';
    originDOMAIN = '//console.pl.weimob.com';
    retailURL = '//retail.console.pl.weimob.com/#/app/';
    basicURL = '//basis.console.pl.weimob.com/#/app/';
    supplierURL = `//${SYSTEM_NAME}.console.pl.weimob.com/#/app/`;
    wisdomURL = '//wisdom.console.pl.weimob.com/#/';
    break;
  }
  case REGEXP_DOMAIN_QA.test(hostname): {
    env = 'qa';
    dotENV = 'qa';
    logoutURL = '//account.saas.weimobqa.com/logout';
    originDOMAIN = '//console.saas.weimobqa.com';
    retailURL = '//retail.console.saas.weimobqa.com/#/app/';
    basicURL = '//basis.console.saas.weimobqa.com/#/app/';
    supplierURL = `//${SYSTEM_NAME}.console.saas.weimobqa.com/#/app/`;
    wisdomURL = '//wisdom.console.saas.weimobqa.com/#/';
    break;
  }
  case REGEXP_DOMAIN_DEV.test(hostname): {
    env = 'dev';
    dotENV = 'development';
    logoutURL = '//account.dev.weimob.com/logout';
    originDOMAIN = '//console.dev.weimob.com';
    retailURL = '//retail.console.dev.weimob.com/#/app/';
    basicURL = '//basis.console.dev.weimob.com/#/app/';
    supplierURL = `//${SYSTEM_NAME}.console.dev.weimob.com/#/app/`;
    wisdomURL = '//wisdom.console.dev.weimob.com/#/';
    break;
  }

  default:
    env = 'dev';
    dotENV = 'localhost';
    logoutURL = '//account.dev.weimob.com/logout';
    originDOMAIN = '//console.dev.weimob.com';
    retailURL = '//retail.console.dev.weimob.com/#/app/';
    basicURL = '//basis.console.dev.weimob.com/#/app/';
    supplierURL = `//${SYSTEM_NAME}.console.dev.weimob.com/#/app/`;
    wisdomURL = '//wisdom.console.dev.weimob.com/#/';
    break;
}

const getToken = () => {
  let token = '';
  if (env === 'online') {
    token = Cookies.get('saasAuthData');
  } else {
    token = Cookies.get(`saasAuthData_${env}`);
  }
  return (
    token || 'e1cfc43aa7494965b0d4be1f1edea9db'
  );
};

const removeToken = () => {
  if (env === 'online') {
    Cookies.remove('saasAuthData');
  } else {
    Cookies.remove(`saasAuthData_${env}`);
  }
};

const getPid = () => {
  const {
    location: { pathname },
  } = history;
  return pathname.split('/')[2];
};

const getStoreId = () => {
  const {
    location: { pathname },
  } = history;
  return pathname.split('/')[3];
};

export {
  SYSTEM_NAME,
  env,
  dotENV,
  logoutURL,
  originDOMAIN,
  getToken,
  getPid,
  getStoreId,
  removeToken,
  retailURL,
  basicURL,
  supplierURL,
  wisdomURL,
};
