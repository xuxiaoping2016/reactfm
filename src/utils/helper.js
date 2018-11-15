import { isNil, isNumber, mapKeys } from 'lodash';
import { SYSTEM_NAME } from './env';
import { qualificationEditPath } from './pathPattern';

export const convertDataToForm = data =>
  Object.keys(data).reduce((prev, cur) => {
    prev[cur] = { value: isNil(data[cur]) ? '--' : data[cur] };
    return prev;
  }, {});

export const formatPathName = string => {
  let arr = string.split('/');
  const last = parseInt(arr[arr.length - 1], 10);
  if (isNumber(last) && !isNaN(last)) {
    arr = arr.slice(0, arr.length - 1);
  }
  return arr.join('/');
};

const matchWhiteList = [qualificationEditPath];

export const findMatch = (array, targetUrl) => {
  // 白名单，二级菜单里面没有的url也需要显示二级菜单，fixed:bug#1055197
  const matched = matchWhiteList.some(f => f() === targetUrl);
  if (matched) {
    const level1ModuleName = targetUrl.split('/')[5];
    if (level1ModuleName) {
      const len = array.length;
      for (let i = 0; i < len; i++) {
        if (array[i].code.endsWith(level1ModuleName)) {
          return array[i].id;
        }
      }
    }
  }

  let match = '';
  const loop = arr =>
    arr.reduce((prev, cur) => {
      if (cur.url && cur.url.includes(formatPathName(targetUrl))) {
        prev = true;
      } else if (cur.child && loop(Object.values(cur.child))) {
        prev = true;
      }
      return prev;
    }, false);

  array.forEach(p => {
    if (p.url && p.url.includes(formatPathName(targetUrl))) {
      match = p.id;
    } else if (p.child && loop(Object.values(p.child))) {
      match = p.id;
    }
  });
  return match;
};

export const findSubMatch = (array, targetUrl) => {
  let match = '';
  const loop = arr =>
    arr.reduce((prev, cur) => {
      if (cur.url && cur.url.includes(formatPathName(targetUrl))) {
        match = cur.id;
      } else if (cur.child) {
        loop(Object.values(cur.child));
      }
    }, []);
  loop(array);
  return match;
};

export const getQuery = query => {
  const q = query.indexOf('?') != -1 ? query.slice(1) : query;
  const qList = {};
  q.split('&').forEach(val => {
    const cur = val.split('=');
    qList[cur[0]] = cur[1];
  });
  return qList;
};

// 获取URL所有参数  返回对象方便解构
export const getRequestParams = () => {
  const url = window.location.href;
  const theRequest = {};
  const index = url.indexOf('?');
  if (index !== -1) {
    const str = url.substr(index + 1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
};
export const convertToCascader = (arr, keysMap, childrenKey) => {
  const replaceKeys = obj =>
    mapKeys(obj, (value, key) => {
      if (keysMap[key]) {
        return keysMap[key];
      }
      return key;
    });

  const mapper = subArr =>
    subArr.map(p => {
      if (!p[childrenKey]) {
        return replaceKeys(p);
      }
      return {
        ...replaceKeys(p),
        children: mapper(p[childrenKey]),
      };
    });

  return mapper(arr);
};

/**
 *  返回筛选过的 menu 数组
 * @param {Object} menus 从服务器拿到的 menus
 */
export const filterSupplierMenu = (menus, isEnter) => {
  const filteredShowMenus = Object.values(menus || {}).filter(p => p.isShow);
  const filteredMenus = isEnter
    ? filteredShowMenus
    : filteredShowMenus.filter(p => !p.code.includes(SYSTEM_NAME));
  const supplierMenus = filteredShowMenus.filter(p =>
    p.code.includes(SYSTEM_NAME)
  )[0];
  console.info(supplierMenus);
  const qualificationMenus = Object.values(supplierMenus.child).filter(
    p =>
      !p.code.startsWith(SYSTEM_NAME) ||
      (p.code.startsWith(SYSTEM_NAME) && p.code.includes('qualification'))
  );
  if (!isEnter) {
    filteredMenus.push({
      ...supplierMenus,
      child: { ...qualificationMenus },
    });
  }
  console.info('nextMenus', filteredMenus);
  return filteredMenus;
};
