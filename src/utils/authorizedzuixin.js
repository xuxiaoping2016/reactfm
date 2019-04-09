import React from 'react';
import { observer, inject } from 'mobx-react';
import RenderAuthorized from 'components/authorized';
import Loading from 'components/loadable';
import history from 'utils/history';
import { compose } from './helper';
import { logout } from './env';

/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorized([]);
const authPrefix = 'supplier#';

/**
 * @returns authority 权限字符串
 * @description 根据pathname按照一定规则得到权限字符串，例如：
 * pathname是'/app/7078/16599078/goods/list',
 * 后端对应的权限字符串是 'supplier#app.goods.list'
 */
function getRouteAuthority() {
  const { pathname } = history.location;
  return (
    authPrefix +
    pathname
      .replace(/\/\d+/g, '')
      .slice(1)
      .replace(/\//g, '.')
  );
}

const AuthorizedRoute = compose(
  inject(({ XinyunStore, financeStore }) => ({
    xinyunStore: XinyunStore,
    financeStore,
  })),
  observer
)(props => {
  const {
    xinyunStore: { keys },
    financeStore: { fid2 },
    ...restProps
  } = props;
  Authorized = RenderAuthorized(keys);
  if (!keys || keys.length === 0 || !fid2) {
    return <Loading />;
  }
  return (
    <Authorized.Route
      authority={getRouteAuthority()}
      onReject={logout}
      {...restProps}
    />
  );
});

export default Authorized;
export { AuthorizedRoute };
