import React from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import RenderAuthorized from 'components/authorized';
import { prefix } from './permissions';
import { logoutURL } from './env';
import xinyunStore from '../stores/xinyun';

/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorized(xinyunStore.keys);
autorun(() => {
  // 刷新permissions
  Authorized = RenderAuthorized(xinyunStore.keys);
});

@observer
class AuthorizedRoute extends React.Component {
  render() {
    const {
      location: { pathname },
    } = this.props;
    if (!xinyunStore.keys || xinyunStore.keys.length === 0) {
      return null;
    }
    const authority =
      prefix +
      pathname
        .replace(/\/\d+/g, '')
        .slice(1)
        .replace(/\//g, '.');

    return <Authorized.Route authority={authority} {...this.props} />;
  }
}

AuthorizedRoute.defaultProps = {
  onUnMatched: () => {
    console.log('onUnMatched');
    window.location.href = logoutURL;
  },
};

export default Authorized;
export { AuthorizedRoute };
