import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './authorized';

export default function AuthorizedRoute(properties) {
  const {
    component: Component,
    render,
    authority,
    redirectPath,
    onReject,
    ...rest
  } = properties;

  const NoMatch = redirectPath ? (
    <Redirect to={{ pathname: redirectPath }} />
  ) : null;

  return (
    <Authorized authority={authority} onReject={onReject} noMatch={NoMatch}>
      <Route
        {...rest}
        render={props => (Component ? <Component {...props} /> : render(props))}
      />
    </Authorized>
  );
}
