import React from 'react';
import checkPermissions from './checkPermissions';

/**
  authority  需要校验的权限字符串
	noMatch  是
	onReject  logout = () => {
              removeToken();
              window.location.href = logoutURL;
            }
}
 */
export default function Authorized(props) {
  const { authority, children = null, noMatch = null, onReject } = props;
  return checkPermissions(authority, children, noMatch, onReject);
}
