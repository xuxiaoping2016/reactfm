import React from 'react';
import Authorized from './authorized';

const indentity = () => null;

export default function Secured(authority, options = {}) {
  const { noMatch = null, onReject = indentity } = options;
  return WrappedComponent => {
    function WithAuthHOC(props) {
      return (
        <Authorized
          authority={authority}
          noMatch={noMatch}
          onUnMatche={onReject}
        >
          <WrappedComponent {...props} />
        </Authorized>
      );
    }
    WithAuthHOC.displayName =
      WrappedComponent.displayName ||
      WrappedComponent.name ||
      'AuthorizedComponent';
    return WithAuthHOC;
  };
}
