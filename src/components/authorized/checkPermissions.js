import { currentPermissions } from './renderAuthorize';

let permissionsCache = null;
const authMapCache = {};

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限 string |array | Function } auth
 * @param { 权限列表 } permissions
 * @param { 通过的组件 } target
 * @param { 未通过的组件 } exception
 */
function checkPermissions(auth, permissions, target, exception) {
  if (typeof auth === 'function') {
    return auth(permissions) ? target : exception;
  }
  if (typeof auth === 'string') {
    if (permissions === permissionsCache && authMapCache.hasOwnProperty(auth)) {
      return authMapCache[auth] ? target : exception;
    }
    permissionsCache = permissions;
    // console.log('reCompotuted');
    if (permissions.includes(auth)) {
      authMapCache[auth] = true;
    } else {
      authMapCache[auth] = false;
    }
    return authMapCache[auth] ? target : exception;
  }
  if (Array.isArray(auth)) {
    const authKey = auth.sort().join('-');
    if (
      permissions === permissionsCache &&
      authMapCache.hasOwnProperty(authKey)
    ) {
      return authMapCache[authKey] ? target : exception;
    }
    permissionsCache = permissions;
    authMapCache[authKey] = false;
    for (let i = 0; i < auth.length; i++) {
      if (permissions.includes(auth[i])) {
        authMapCache[authKey] = true;
        break;
      }
    }
    return authMapCache[auth] ? target : exception;
  }
  return exception;
}

export default function check(auth, target, exception, onReject) {
  const result = checkPermissions(auth, currentPermissions, target, exception);
  if (result !== target && typeof onReject === 'function') {
    onReject(currentPermissions);
  }
  return result;
}
