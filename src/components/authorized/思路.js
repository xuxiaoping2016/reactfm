let currentPermissions = [];

function renderAuthorize(Authorized) {
//   return function authorize(permissions) {
//     currentPermissions = permissions;
//     return Authorized;
//   };
  currentPermissions = permissions;

  return function Authorized(props) {
    const { authority, children = null, noMatch = null, onReject } = props;
    return checkPermissions(authority, children, noMatch, onReject);
  };
}

export { currentPermissions };
export default renderAuthorize;