import React from 'react';

export default function WithRef(WrappedComponent) {
  function WithRefHOC(props) {
    const { getInstance, ...restProps } = props;
    if (typeof getInstance === 'function') {
      restProps.ref = getInstance;
    }
    return <WrappedComponent {...restProps} />;
  }
  WithRefHOC.displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return WithRefHOC;
}
