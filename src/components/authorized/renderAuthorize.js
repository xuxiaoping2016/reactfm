/* eslint-disable import/no-mutable-exports */
let currentPermissions = [];

function renderAuthorize(Authorized) {
  return function(permissions) {
    currentPermissions = permissions;
    return Authorized;
  };
}

export { currentPermissions };
export default renderAuthorize;
