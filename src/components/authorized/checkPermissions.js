import { currentPermissions } from './renderAuthorize';

let permissionsCache = null;
const has = Object.prototype.hasOwnProperty;
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
  // 项目中 传递的是 getRouteAuthority()函数计算后的需要验证的权限字符串
  // 如果是函数 则校验当前路径字符串，成功返回子元素，否则返回跳转路径组件
  if (typeof auth === 'function') {
    return auth(permissions) ? target : exception;
  }
  // 是字符串  
  if (typeof auth === 'string') {
    if (permissions === permissionsCache && has.call(authMapCache, auth)) {
      return authMapCache[auth] ? target : exception;
    }
    permissionsCache = permissions;
    // console.log('reCompotuted');
    // 判断判断当前页面是否有权限，并在缓存下来以便下次使用
    if (permissions.includes(auth)) {
      authMapCache[auth] = true;
    } else {
      authMapCache[auth] = false;
    }
    return authMapCache[auth] ? target : exception;
  }
  if (Array.isArray(auth)) {
    const authKey = auth.sort().join('-');
    if (permissions === permissionsCache && has.call(authMapCache, authKey)) {
      return authMapCache[authKey] ? target : exception;
    }
    permissionsCache = permissions;
    authMapCache[authKey] = false;
    // eslint-disable-next-line no-plusplus
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


// auth  需要校验的权限字符串  "ec#app.marketing.searchSource1
// target  子元素 children
// 	exception 是 noMatch  没有匹配时的跳转路径组件
                // const NoMatch = redirectPath ? (
                //   <Redirect to={{ pathname: redirectPath }} />
                // ) : null;
// 	onReject  logout = () => {
//               removeToken();
//               window.location.href = logoutURL;
//             }
export default function check(auth, target, exception, onReject) {
  const result = checkPermissions(auth, currentPermissions, target, exception);
  //result !== target  当没有权限返回的是exception
  // onReject 为函数则执行，否则显示exception
  if (result !== target && typeof onReject === 'function') {
    onReject(currentPermissions);
  }
  return result;
}
